
// Enhanced Quiz Game Main Logic with improved reliability
class QuizGame {
  constructor() {
    this.currentCategory = '';
    this.questions = [];
    this.currentQuestionIndex = 0;
    this.score = 0;
    this.timeLeft = 30;
    this.timer = null;
    this.userAnswers = [];
    this.gameStartTime = null;
    this.isQuestionAnswered = false;
    this.audioEnabled = false;
    
    this.initializeGame();
  }

  async initializeGame() {
    try {
      // Wait for DOM to be fully loaded
      if (document.readyState === 'loading') {
        await new Promise(resolve => {
          document.addEventListener('DOMContentLoaded', resolve);
        });
      }

      this.loadCategoryScreen();
      this.bindEvents();
      this.enableAudioOnFirstInteraction();
      
      console.log('Quiz game initialized successfully');
    } catch (error) {
      console.error('Failed to initialize quiz game:', error);
      this.handleError('Failed to initialize game. Please refresh the page.');
    }
  }

  enableAudioOnFirstInteraction() {
    // Enable audio context on first user interaction
    const enableAudio = async () => {
      if (!this.audioEnabled && soundManager) {
        try {
          await soundManager.enableAudio();
          this.audioEnabled = true;
          console.log('Audio enabled');
        } catch (error) {
          console.log('Audio could not be enabled:', error.message);
        }
      }
    };

    // Listen for first click or touch
    const firstInteraction = () => {
      enableAudio();
      document.removeEventListener('click', firstInteraction);
      document.removeEventListener('touchstart', firstInteraction);
    };

    document.addEventListener('click', firstInteraction);
    document.addEventListener('touchstart', firstInteraction);
  }

  bindEvents() {
    try {
      // Category selection with error handling
      const categoriesGrid = document.getElementById('categoriesGrid');
      if (categoriesGrid) {
        categoriesGrid.addEventListener('click', this.handleCategoryClick.bind(this));
      }

      // Quit button
      const quitBtn = document.getElementById('quitBtn');
      if (quitBtn) {
        quitBtn.addEventListener('click', this.handleQuitClick.bind(this));
      }

      // Results screen buttons
      const playAgainBtn = document.getElementById('playAgainBtn');
      if (playAgainBtn) {
        playAgainBtn.addEventListener('click', this.handlePlayAgainClick.bind(this));
      }

      const changeCategoryBtn = document.getElementById('changeCategoryBtn');
      if (changeCategoryBtn) {
        changeCategoryBtn.addEventListener('click', this.handleChangeCategoryClick.bind(this));
      }

      // Global click sound with throttling
      this.addGlobalClickSound();
      
    } catch (error) {
      console.error('Failed to bind events:', error);
    }
  }

  addGlobalClickSound() {
    let lastClickTime = 0;
    const throttleDelay = 100; // Prevent too many sounds

    document.addEventListener('click', (e) => {
      const now = Date.now();
      if (now - lastClickTime > throttleDelay) {
        if (e.target.matches('button') || e.target.closest('button') || 
            e.target.matches('.category-card') || e.target.closest('.category-card') ||
            e.target.matches('.option') || e.target.closest('.option')) {
          this.playSound('click');
          lastClickTime = now;
        }
      }
    });
  }

  handleCategoryClick(e) {
    const categoryCard = e.target.closest('.category-card');
    if (categoryCard && categoryCard.dataset.category) {
      const category = categoryCard.dataset.category;
      this.startQuiz(category);
    }
  }

  handleQuitClick() {
    if (confirm('Are you sure you want to quit the quiz?')) {
      this.quitQuiz();
    }
  }

  handlePlayAgainClick() {
    this.restartQuiz();
  }

  handleChangeCategoryClick() {
    this.goToCategorySelection();
  }

  loadCategoryScreen() {
    try {
      const categoriesGrid = document.getElementById('categoriesGrid');
      if (!categoriesGrid) {
        throw new Error('Categories grid element not found');
      }

      categoriesGrid.innerHTML = '';

      Object.keys(categoryConfig).forEach(category => {
        try {
          const config = categoryConfig[category];
          const categoryCard = this.createCategoryCard(category, config);
          categoriesGrid.appendChild(categoryCard);
        } catch (error) {
          console.error(`Failed to create category card for ${category}:`, error);
        }
      });
    } catch (error) {
      console.error('Failed to load category screen:', error);
      this.handleError('Failed to load categories. Please refresh the page.');
    }
  }

  createCategoryCard(category, config) {
    const categoryCard = document.createElement('div');
    categoryCard.className = 'category-card';
    categoryCard.dataset.category = category;
    categoryCard.setAttribute('tabindex', '0'); // Make keyboard accessible
    
    categoryCard.innerHTML = `
      <div class="category-icon ${config.color}">
        <i class="${config.icon}"></i>
      </div>
      <h3>${this.escapeHtml(category)}</h3>
      <p>${this.escapeHtml(config.description)}</p>
      <button class="category-btn">Start Quiz</button>
    `;

    // Add keyboard support
    categoryCard.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        this.startQuiz(category);
      }
    });

    return categoryCard;
  }

  escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
  }

  startQuiz(category) {
    try {
      if (!quizData[category] || !Array.isArray(quizData[category])) {
        throw new Error(`Invalid category data for: ${category}`);
      }

      this.currentCategory = category;
      this.questions = this.shuffleArray([...quizData[category]]).slice(0, 10);
      this.currentQuestionIndex = 0;
      this.score = 0;
      this.userAnswers = [];
      this.gameStartTime = Date.now();
      this.isQuestionAnswered = false;

      this.playSound('start');
      this.showScreen('quizScreen');
      this.loadQuestion();
      this.startTimer();
      
      console.log(`Started quiz for category: ${category}`);
    } catch (error) {
      console.error('Failed to start quiz:', error);
      this.handleError('Failed to start quiz. Please try again.');
    }
  }

  loadQuestion() {
    try {
      if (this.currentQuestionIndex >= this.questions.length) {
        this.endQuiz();
        return;
      }

      const question = this.questions[this.currentQuestionIndex];
      if (!question || !question.question || !question.options || !question.correct) {
        throw new Error('Invalid question data');
      }
      
      this.isQuestionAnswered = false;
      
      // Update quiz header
      this.updateQuizHeader();
      
      // Load question and options
      this.displayQuestion(question);
      
      // Reset timer
      this.timeLeft = 30;
      this.updateTimerDisplay();
      
    } catch (error) {
      console.error('Failed to load question:', error);
      this.handleError('Failed to load question. Skipping to next.');
      this.nextQuestion();
    }
  }

  updateQuizHeader() {
    const elements = {
      currentCategory: document.getElementById('currentCategory'),
      currentQuestion: document.getElementById('currentQuestion'),
      totalQuestions: document.getElementById('totalQuestions'),
      progressFill: document.getElementById('progressFill')
    };

    if (elements.currentCategory) {
      elements.currentCategory.textContent = this.currentCategory;
    }
    
    if (elements.currentQuestion) {
      elements.currentQuestion.textContent = this.currentQuestionIndex + 1;
    }
    
    if (elements.totalQuestions) {
      elements.totalQuestions.textContent = this.questions.length;
    }
    
    if (elements.progressFill) {
      const progress = ((this.currentQuestionIndex + 1) / this.questions.length) * 100;
      elements.progressFill.style.width = `${Math.min(progress, 100)}%`;
    }
  }

  displayQuestion(question) {
    const questionText = document.getElementById('questionText');
    const optionsContainer = document.getElementById('optionsContainer');
    
    if (!questionText || !optionsContainer) {
      throw new Error('Question display elements not found');
    }

    questionText.textContent = question.question;
    optionsContainer.innerHTML = '';
    
    // Shuffle options to prevent pattern memorization
    const shuffledOptions = this.shuffleArray([...question.options]);
    
    shuffledOptions.forEach((option, index) => {
      const optionElement = this.createOptionElement(option, index);
      optionsContainer.appendChild(optionElement);
    });
  }

  createOptionElement(option, index) {
    const optionElement = document.createElement('div');
    optionElement.className = 'option';
    optionElement.textContent = option;
    optionElement.setAttribute('tabindex', '0'); // Make keyboard accessible
    optionElement.setAttribute('role', 'button');
    optionElement.setAttribute('aria-label', `Option ${index + 1}: ${option}`);
    
    // Mouse click handler
    optionElement.addEventListener('click', (e) => {
      e.preventDefault();
      if (!this.isQuestionAnswered) {
        this.selectAnswer(option);
      }
    });

    // Keyboard handler
    optionElement.addEventListener('keydown', (e) => {
      if ((e.key === 'Enter' || e.key === ' ') && !this.isQuestionAnswered) {
        e.preventDefault();
        this.selectAnswer(option);
      }
    });

    return optionElement;
  }

  selectAnswer(selectedAnswer) {
    if (this.isQuestionAnswered) return;
    
    try {
      this.isQuestionAnswered = true;
      
      const question = this.questions[this.currentQuestionIndex];
      const options = document.querySelectorAll('.option');
      
      // Disable all options and show correct/wrong
      options.forEach(option => {
        option.classList.add('disabled');
        option.setAttribute('aria-disabled', 'true');
        
        if (option.textContent === question.correct) {
          option.classList.add('correct');
        } else if (option.textContent === selectedAnswer && selectedAnswer !== question.correct) {
          option.classList.add('wrong');
        }
      });

      // Store user answer
      this.userAnswers.push({
        question: question.question,
        userAnswer: selectedAnswer,
        correctAnswer: question.correct,
        isCorrect: selectedAnswer === question.correct
      });

      // Update score and play sound
      if (selectedAnswer === question.correct) {
        this.score++;
        this.playSound('correct');
      } else {
        this.playSound('wrong');
      }

      // Stop timer
      this.clearTimer();

      // Move to next question after delay
      setTimeout(() => {
        this.nextQuestion();
      }, 2000);
      
    } catch (error) {
      console.error('Error selecting answer:', error);
      this.nextQuestion();
    }
  }

  nextQuestion() {
    try {
      this.currentQuestionIndex++;
      
      if (this.currentQuestionIndex < this.questions.length) {
        this.loadQuestion();
        this.startTimer();
      } else {
        this.endQuiz();
      }
    } catch (error) {
      console.error('Error moving to next question:', error);
      this.endQuiz();
    }
  }

  startTimer() {
    this.clearTimer(); // Clear any existing timer
    
    this.timer = setInterval(() => {
      try {
        this.timeLeft--;
        this.updateTimerDisplay();
        
        // Play tick sound for last 10 seconds
        if (this.timeLeft <= 10 && this.timeLeft > 0) {
          this.playSound('tick');
        }
        
        if (this.timeLeft <= 0) {
          this.timeUp();
        }
      } catch (error) {
        console.error('Timer error:', error);
        this.clearTimer();
      }
    }, 1000);
  }

  clearTimer() {
    if (this.timer) {
      clearInterval(this.timer);
      this.timer = null;
    }
  }

  updateTimerDisplay() {
    const timerElement = document.getElementById('timer');
    if (!timerElement) return;
    
    timerElement.textContent = Math.max(0, this.timeLeft);
    
    // Update timer styling based on time left
    timerElement.classList.remove('warning', 'danger');
    if (this.timeLeft <= 5) {
      timerElement.classList.add('danger');
    } else if (this.timeLeft <= 10) {
      timerElement.classList.add('warning');
    }
  }

  timeUp() {
    if (this.isQuestionAnswered) return;
    
    try {
      this.clearTimer();
      this.isQuestionAnswered = true;
      
      // Auto-select no answer (wrong)
      const question = this.questions[this.currentQuestionIndex];
      this.userAnswers.push({
        question: question.question,
        userAnswer: 'Time\'s up - No answer',
        correctAnswer: question.correct,
        isCorrect: false
      });

      // Show correct answer
      const options = document.querySelectorAll('.option');
      options.forEach(option => {
        option.classList.add('disabled');
        option.setAttribute('aria-disabled', 'true');
        if (option.textContent === question.correct) {
          option.classList.add('correct');
        }
      });

      this.playSound('wrong');
      
      setTimeout(() => {
        this.nextQuestion();
      }, 2000);
      
    } catch (error) {
      console.error('Error handling time up:', error);
      this.nextQuestion();
    }
  }

  endQuiz() {
    try {
      this.clearTimer();
      const timeTaken = Math.floor((Date.now() - this.gameStartTime) / 1000);
      
      this.playSound('finish');
      this.showResults(timeTaken);
      
      console.log(`Quiz completed. Score: ${this.score}/${this.questions.length}`);
    } catch (error) {
      console.error('Error ending quiz:', error);
      this.handleError('Quiz completed but there was an error showing results.');
    }
  }

  showResults(timeTaken) {
    try {
      // Update score display
      this.updateElement('finalScore', this.score);
      this.updateElement('totalScore', this.questions.length);
      
      // Update score message
      const percentage = (this.score / this.questions.length) * 100;
      let message = 'Try Again!';
      if (percentage >= 90) message = 'Excellent! 🏆';
      else if (percentage >= 70) message = 'Great Job! 🎉';
      else if (percentage >= 50) message = 'Good Effort! 👍';
      
      this.updateElement('scoreMessage', message);
      
      // Update performance stats
      this.updateElement('correctAnswers', this.score);
      this.updateElement('wrongAnswers', this.questions.length - this.score);
      this.updateElement('timeTaken', timeTaken);
      
      // Show answer review
      this.showAnswerReview();
      
      this.showScreen('resultsScreen');
    } catch (error) {
      console.error('Error showing results:', error);
      this.handleError('Error displaying results.');
    }
  }

  updateElement(id, content) {
    const element = document.getElementById(id);
    if (element) {
      element.textContent = content;
    }
  }

  showAnswerReview() {
    try {
      const reviewContainer = document.getElementById('answersReview');
      if (!reviewContainer) return;
      
      reviewContainer.innerHTML = '';
      
      this.userAnswers.forEach((answer, index) => {
        const reviewItem = this.createReviewItem(answer, index);
        reviewContainer.appendChild(reviewItem);
      });
    } catch (error) {
      console.error('Error showing answer review:', error);
    }
  }

  createReviewItem(answer, index) {
    const reviewItem = document.createElement('div');
    reviewItem.className = `review-item ${answer.isCorrect ? 'correct' : 'wrong'}`;
    
    reviewItem.innerHTML = `
      <div class="review-question">
        Q${index + 1}: ${this.escapeHtml(answer.question)}
      </div>
      <div class="review-answer">
        Your answer: ${this.escapeHtml(answer.userAnswer)}<br>
        Correct answer: ${this.escapeHtml(answer.correctAnswer)}
      </div>
    `;
    
    return reviewItem;
  }

  quitQuiz() {
    this.clearTimer();
    this.playSound('click');
    this.goToCategorySelection();
  }

  restartQuiz() {
    this.playSound('click');
    this.startQuiz(this.currentCategory);
  }

  goToCategorySelection() {
    this.clearTimer();
    this.playSound('click');
    this.showScreen('categoryScreen');
  }

  showScreen(screenId) {
    try {
      // Hide all screens
      document.querySelectorAll('.screen').forEach(screen => {
        screen.classList.remove('active');
      });
      
      // Show target screen
      const targetScreen = document.getElementById(screenId);
      if (targetScreen) {
        targetScreen.classList.add('active');
      } else {
        throw new Error(`Screen ${screenId} not found`);
      }
    } catch (error) {
      console.error('Error showing screen:', error);
    }
  }

  showLoading() {
    const loadingOverlay = document.getElementById('loadingOverlay');
    if (loadingOverlay) {
      loadingOverlay.classList.add('active');
    }
  }

  hideLoading() {
    const loadingOverlay = document.getElementById('loadingOverlay');
    if (loadingOverlay) {
      loadingOverlay.classList.remove('active');
    }
  }

  shuffleArray(array) {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  }

  playSound(type) {
    try {
      if (soundManager && typeof soundManager.playSound === 'function') {
        soundManager.playSound(type);
      }
    } catch (error) {
      // Silently fail for sound errors
      console.log('Sound error:', error.message);
    }
  }

  handleError(message) {
    console.error('Quiz Game Error:', message);
    
    // Show user-friendly error message
    const errorDiv = document.createElement('div');
    errorDiv.style.cssText = `
      position: fixed;
      top: 20px;
      right: 20px;
      background: #ff4444;
      color: white;
      padding: 1rem;
      border-radius: 8px;
      box-shadow: 0 4px 12px rgba(0,0,0,0.3);
      z-index: 10000;
      max-width: 300px;
      word-wrap: break-word;
    `;
    errorDiv.textContent = message;
    
    document.body.appendChild(errorDiv);
    
    // Remove error message after 5 seconds
    setTimeout(() => {
      if (errorDiv.parentNode) {
        errorDiv.parentNode.removeChild(errorDiv);
      }
    }, 5000);
  }

  // Cleanup method
  destroy() {
    this.clearTimer();
    if (soundManager && soundManager.destroy) {
      soundManager.destroy();
    }
  }
}

// Initialize the game when DOM is loaded with error handling
let gameInstance = null;

function initializeQuizGame() {
  try {
    gameInstance = new QuizGame();
  } catch (error) {
    console.error('Failed to initialize quiz game:', error);
    
    // Show fallback error message
    document.body.innerHTML = `
      <div style="
        display: flex;
        align-items: center;
        justify-content: center;
        min-height: 100vh;
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        color: white;
        font-family: Arial, sans-serif;
        text-align: center;
        padding: 20px;
      ">
        <div>
          <h1>⚠️ Quiz Game Error</h1>
          <p>Sorry, there was an error loading the quiz game.</p>
          <p>Please refresh the page to try again.</p>
          <button onclick="location.reload()" style="
            background: white;
            color: #667eea;
            border: none;
            padding: 12px 24px;
            border-radius: 25px;
            font-weight: 600;
            cursor: pointer;
            margin-top: 20px;
          ">
            Refresh Page
          </button>
        </div>
      </div>
    `;
  }
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initializeQuizGame);
} else {
  initializeQuizGame();
}

// Cleanup on page unload
window.addEventListener('beforeunload', () => {
  if (gameInstance && gameInstance.destroy) {
    gameInstance.destroy();
  }
});

// Export for potential module use
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { QuizGame };
}
