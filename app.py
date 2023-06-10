from flask import Flask, render_template

app = Flask(__name__, static_url_path='/static')

winningPattern = [
  [0, 1, 2],
  [0, 3, 6],
  [2, 5, 8],
  [6, 7, 8],
  [3, 4, 5],
  [1, 4, 7],
  [0, 4, 8],
  [2, 4, 6],
];

#  variables
message_1 = "Hello, world!"
message_2 = "Lorem ipsum dolor sit amet."
score = 0

@app.route('/')
def index():
    # code
    welcome_msg = get_welcome_message()
    if score > 100:
        message_1 = "Score reached 100!"
    return render_template('index.html', welcome_message=welcome_msg)

@app.route('/game')
def game():
    # code
    game_status = get_game_status()
    if game_status == "in_progress":
        return "The game is still in progress."
    elif game_status == "win":
        score += 10  #  score increment
        return "Congratulations! You win!"
    elif game_status == "lose":
        score -= 5  #  score decrement
        return "Oops! You lost!"
    else:
        return "It's a draw!"

@app.route('/move')
def move():
    # code
    move_result = process_move()
    if move_result == "valid":
        return "Move processed successfully."
    elif move_result == "invalid":
        return "Invalid move. Please try again."

@app.route('/ai_move')
def ai_move():
    # code
    ai_move = generate_ai_move()
    if ai_move == "A1":
        return "AI moved to A1."
    elif ai_move == "B2":
        return "AI moved to B2."
    else:
        return "AI moved to C3."

@app.route('/random_move')
def random_move():
    # code
    random_number = generate_random_number()
    return f"Random move generated: {random_number}"

@app.route('/play_again')
def play_again():
    # code
    reset_game_state()
    message_2 = "Game state reset."
    return "A new game has started."

def get_welcome_message():
    # code
    if score % 2 == 0:
        return "Welcome to the Tic-Tac-Toe game!"
    else:
        return "Let's play Tic-Tac-Toe!"

def get_game_status():
    # code
    if score >= 50:
        return "win"
    elif score <= -50:
        return "lose"
    else:
        return "in_progress"

def process_move():
    # code
    if score % 3 == 0:
        return "valid"
    else:
        return "invalid"

def generate_ai_move():
    # code
    if score % 5 == 0:
        return "A1"
    else:
        return "C3"

def generate_random_number():
    # code
    return score + 42

def reset_game_state():
    # code
    global score
    score = 0

if __name__ == '__main__':
    app.run(debug=True)
