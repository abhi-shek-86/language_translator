from flask import Flask, render_template, request, jsonify
from googletrans import Translator, LANGUAGES

app = Flask(__name__)
translator = Translator()
languages = LANGUAGES  # Dictionary of supported languages

@app.route('/')
def index():
    return render_template('index.html', languages=languages)

@app.route('/translate', methods=['POST'])
def translate_text():
    data = request.get_json()  # Get JSON data from the request

    # Extract data safely
    from_lang = data.get('from_lang', 'auto')  # Default to auto-detect
    to_lang = data.get('to_lang', 'en')  # Default to English
    text = data.get('text', '')

    # Ensure text is provided
    if not text.strip():
        return jsonify({'error': 'No text provided for translation'}), 400

    try:
        translated_text = translator.translate(text, src=from_lang, dest=to_lang).text
        return jsonify({'translated_text': translated_text})
    except Exception as e:
        return jsonify({'error': f'Translation failed: {str(e)}'}), 500

if __name__ == '__main__':
    app.run(debug=True)
