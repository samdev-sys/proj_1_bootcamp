from flask import Flask, request, jsonify
import webbrowser as wb

app = Flask(__name__)

chrome_path = "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe"
wb.register('chrome', None, wb.BackgroundBrowser(chrome_path))

urls=[]

@app.route('/open_urls', methods=['POST'])
def open_urls():
    data = request.json
    urls = data.get("urls", [])
    
    for url in urls:
        wb.get('chrome').open(url)
    
    return jsonify({"message": "URLs abiertas exitosamente"})

if __name__ == '__main__':
    app.run(debug=True)

@app.route('/add_url', methods=['POST'])
def add_url():
    data = request.json
    urls.append(data['url'])
    return jsonify({"message": "URL guardada!"})

@app.route('/get_urls', methods=['GET'])
def get_urls():
    return jsonify({"urls": urls})

if __name__ == '__main__':
    app.run(debug=True)

    