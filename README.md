# ClickFit - Image Upload Application

ClickFit is a modern web application that allows users to upload and manage images with a beautiful and intuitive interface. The application features drag-and-drop functionality, real-time upload status feedback, and responsive design.

## Features

- 🖼️ Drag and drop image upload
- 📱 Responsive design for all devices
- ⚡ Real-time upload status feedback
- 🔄 Automatic file validation
- 🎨 Modern and clean UI
- 💾 File size and type validation
- 🔍 Error handling with retry option

## Prerequisites

Before you begin, ensure you have the following installed:
- Node.js (v14 or higher)
- npm (Node Package Manager)

## Project Structure

```
clickFit/
├── client/
│   ├── css/
│   │   └── styles.css
│   ├── js/
│   │   ├── main.js
│   │   └── upload.js
│   └── index.html
├── server/
│   ├── routes/
│   │   └── upload.routes.js
│   └── server.js
└── upload_images/
```

## Setup Instructions

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd clickFit
   ```

2. **Install server dependencies**
   ```bash
   cd server
   npm install
   ```

3. **Install client dependencies**
   ```bash
   cd ../client
   npm install
   ```

4. **Configure the server**
   - The server runs on port 3000 by default
   - You can modify the port in `server/server.js` if needed

5. **Start the server**
   ```bash
   cd ../server
   npm start
   ```

6. **Access the application**
   - Open your browser and navigate to `http://localhost:3000`

## Usage

1. **Uploading Images**
   - Drag and drop an image onto the upload area
   - Or click the upload area to select a file
   - Supported formats: JPG, PNG, GIF
   - Maximum file size: 5MB

2. **Upload Status**
   - Loading indicator while uploading
   - Success message with file details
   - Error message with retry option if upload fails

## API Endpoints

- `POST /api/upload`
  - Uploads an image file
  - Accepts multipart/form-data
  - Returns file details on success

## Error Handling

The application handles various error cases:
- Invalid file types
- File size exceeding limit
- Network errors
- Server errors
