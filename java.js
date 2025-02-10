let timeLeft = 0;
        let timerId = null;
        const display = document.getElementById('display');
        const startStopBtn = document.getElementById('startStop');
        const resetBtn = document.getElementById('reset');
        const presetBtns = document.querySelectorAll('.preset');

        function formatTime(seconds) {
            const mins = Math.floor(seconds / 60);
            const secs = seconds % 60;
            return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
        }

        function updateDisplay() {
            display.textContent = formatTime(timeLeft);
        }

        function startTimer() {
            if (timeLeft <= 0) return;
            
            timerId = setInterval(() => {
                timeLeft--;
                updateDisplay();
                
                if (timeLeft <= 0) {
                    stopTimer();
                    alert('Time is up!');
                }
            }, 1000);

            startStopBtn.textContent = 'Stop';
            startStopBtn.classList.add('stop');
        }

        function stopTimer() {
            clearInterval(timerId);
            timerId = null;
            startStopBtn.textContent = 'Start';
            startStopBtn.classList.remove('stop');
        }

        startStopBtn.addEventListener('click', () => {
            if (timerId) {
                stopTimer();
            } else {
                startTimer();
            }
        });

        resetBtn.addEventListener('click', () => {
            stopTimer();
            timeLeft = 0;
            updateDisplay();
        });

        presetBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                stopTimer();
                timeLeft = parseInt(btn.dataset.time);
                updateDisplay();
            });
        });
