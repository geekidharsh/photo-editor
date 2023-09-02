from flask import Flask, request, render_template

app = Flask(__name__, static_url_path='/static', static_folder='static')

@app.route('/')
def index():
    # read and server the html directly
    with open('index.html', 'r') as file:
        return file.read()

@app.route('/uploads', methods=['POST'])
def upload():
    if 'image' not in request.files:
        return 'No file part'
    
    # handle multiple file from post
    files = request.files.getlist('image')

    if not files:
        return 'No files selected'

    file_paths = []

    for file in files:    
        if file.filename == '':
            continue
        # generate unique output file path names
        unique_filename = generate_unique_filename(file.filename)
        file_path = f'uploads/{unique_filename}'
        
        # Save the uploaded file to the 'uploads' folder
        file.save(file_path)
        file_paths.append(file_path)
    return f'{len(file_paths)} file(s) uploaded successfully'


def generate_unique_filename(filename):
    # Implement your logic to generate a unique filename if needed
    # For example, you can append a timestamp or use a random string
    return filename  # For simplicity, using the original filename

if __name__ == '__main__':
    app.run(debug=True)
