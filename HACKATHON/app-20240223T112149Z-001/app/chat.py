import openai
from flask import Flask, request, jsonify

# Initialize your OpenAI API key
openai.api_key = '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'

app = Flask(__name__)

# Function to interact with OpenAI API and generate response
def generate_response(doubt):
    # Example: Use OpenAI's completion endpoint to generate response
    response = openai.Completion.create(
        engine="text-davinci-003",  # Choose the engine you want to use
        prompt=doubt,
        max_tokens=50  # Adjust the max_tokens parameter as needed
    )
    return response.choices[0].text.strip()

# Route to handle user doubts
@app.route('/ask_doubt', methods=['POST'])
def ask_doubt():
    # Get the doubt from the request
    doubt = request.json.get('doubt')

    # Generate response using OpenAI
    response = generate_response(doubt)

    # Respond to the request with the generated response
    return jsonify({"response": response})

if __name__ == '__main__':
    app.run(debug=True)
