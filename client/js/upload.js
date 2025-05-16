class FileUploader {
    constructor() {
        this.uploadBox = $('.upload-box');
        this.dropZone = this.uploadBox[0];
        this.setupEventListeners();
    }

    setupEventListeners() {
        // Prevent default drag behaviors
        ['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
            this.dropZone.addEventListener(eventName, this.preventDefaults, false);
            document.body.addEventListener(eventName, this.preventDefaults, false);
        });

        // Highlight drop zone when item is dragged over it
        ['dragenter', 'dragover'].forEach(eventName => {
            this.dropZone.addEventListener(eventName, this.highlight, false);
        });

        ['dragleave', 'drop'].forEach(eventName => {
            this.dropZone.addEventListener(eventName, this.unhighlight, false);
        });

        // Handle dropped files
        this.dropZone.addEventListener('drop', this.handleDrop.bind(this), false);

        // Handle click to upload
        this.uploadBox.on('click', () => {
            const input = document.createElement('input');
            input.type = 'file';
            input.accept = 'image/*';
            input.onchange = (e) => this.handleFiles(e.target.files);
            input.click();
        });
    }

    preventDefaults(e) {
        e.preventDefault();
        e.stopPropagation();
    }

    highlight() {
        this.uploadBox.addClass('upload-box-active');
    }

    unhighlight() {
        this.uploadBox.removeClass('upload-box-active');
    }

    handleDrop(e) {
        const dt = e.dataTransfer;
        const files = dt.files;
        this.handleFiles(files);
    }

    handleFiles(files) {
        if (files.length === 0) return;

        const file = files[0];
        
        // Validate file type
        if (!file.type.startsWith('image/')) {
            this.showError('Please upload only image files.');
            return;
        }

        // Validate file size (5MB)
        if (file.size > 5 * 1024 * 1024) {
            this.showError('File size too large. Maximum size is 5MB.');
            return;
        }

        this.uploadFile(file);
    }

    uploadFile(file) {
        const formData = new FormData();
        formData.append('image', file);

        // Show loading state
        this.showLoading();

        $.ajax({
            url: '/api/upload',
            type: 'POST',
            data: formData,
            processData: false,
            contentType: false,
            success: (response) => {
                this.showSuccess(response);
            },
            error: (xhr) => {
                this.showError(xhr.responseJSON?.error || 'Upload failed');
            }
        });
    }

    showLoading() {
        this.uploadBox.html(`
            <div class="upload-status" style="display: block;">
                <i class="fas fa-spinner fa-spin fa-2x mb-3"></i>
                <p>Uploading your image...</p>
                <small class="text-muted">Please wait while we process your file</small>
            </div>
        `);
    }

    showSuccess(response) {
        this.uploadBox.html(`
            <div class="upload-status" style="display: block;">
                <i class="fas fa-check-circle fa-2x text-success mb-3"></i>
                <p>Upload successful!</p>
                <small class="text-muted">File: ${response.file.filename}</small>
                <small class="text-muted d-block mt-2">Your image is now ready to use</small>
            </div>
        `);

        // Reset after 4 seconds
        setTimeout(() => {
            this.resetUploadBox();
        }, 4000);
    }

    showError(message) {
        const errorDetails = typeof message === 'object' ? message.details : message;
        const errorTitle = typeof message === 'object' ? message.error : 'Upload Error';
        
        this.uploadBox.html(`
            <div class="upload-status error-status" style="display: block;">
                <i class="fas fa-exclamation-circle fa-2x text-danger mb-3"></i>
                <h5 class="error-title">${errorTitle}</h5>
                <p class="error-message">${errorDetails}</p>
                <button class="btn btn-outline-danger btn-sm mt-3 retry-button">
                    <i class="fas fa-redo-alt me-2"></i>Try Again
                </button>
            </div>
        `);

        // Add retry button functionality
        this.uploadBox.find('.retry-button').on('click', (e) => {
            e.stopPropagation();
            this.resetUploadBox();
        });
    }

    resetUploadBox() {
        this.uploadBox.html(`
            <i class="fas fa-cloud-upload-alt fa-3x mb-3"></i>
            <p>Drag and drop images here or click to upload</p>
            <small class="text-muted">Supported formats: JPG, PNG, GIF</small>
        `);
    }
}

// Initialize uploader when document is ready
$(document).ready(() => {
    new FileUploader();
}); 