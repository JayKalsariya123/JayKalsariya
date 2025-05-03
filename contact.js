// Contact Form Handler
class ContactForm {
    constructor() {
        this.form = document.getElementById('contact-form');
        this.nameInput = document.getElementById('name');
        this.emailInput = document.getElementById('email');
        this.messageInput = document.getElementById('message');
        this.submitBtn = this.form.querySelector('.submit-btn');
        
        this.init();
    }

    init() {
        this.form.addEventListener('submit', (e) => this.handleSubmit(e));
        
        // Add input validation listeners
        this.emailInput.addEventListener('input', () => this.validateEmail());
        this.nameInput.addEventListener('input', () => this.validateName());
        this.messageInput.addEventListener('input', () => this.validateMessage());
    }

    validateEmail() {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const isValid = emailRegex.test(this.emailInput.value);
        this.toggleInputValidation(this.emailInput, isValid);
        return isValid;
    }

    validateName() {
        const isValid = this.nameInput.value.trim().length >= 2;
        this.toggleInputValidation(this.nameInput, isValid);
        return isValid;
    }

    validateMessage() {
        const isValid = this.messageInput.value.trim().length >= 10;
        this.toggleInputValidation(this.messageInput, isValid);
        return isValid;
    }

    toggleInputValidation(input, isValid) {
        if (isValid) {
            input.classList.remove('invalid');
            input.classList.add('valid');
        } else {
            input.classList.remove('valid');
            input.classList.add('invalid');
        }
    }

    handleSubmit(e) {
        e.preventDefault();

        // Validate all fields
        const isEmailValid = this.validateEmail();
        const isNameValid = this.validateName();
        const isMessageValid = this.validateMessage();

        if (!isEmailValid || !isNameValid || !isMessageValid) {
            this.showNotification('Please fill all fields correctly', 'error');
            return;
        }

        const name = this.nameInput.value.trim();
        const email = this.emailInput.value.trim();
        const message = this.messageInput.value.trim();

        // Create mailto URL with form data
        const mailtoUrl = `mailto:jaykalsariya98@gmail.com?subject=Portfolio Contact from ${name}&body=Name: ${name}%0D%0AEmail: ${email}%0D%0A%0D%0AMessage:%0D%0A${encodeURIComponent(message)}`;

        // Open default email client
        window.location.href = mailtoUrl;

        // Show success message
        this.showNotification('Opening your email client...', 'success');
        
        // Reset form
        this.form.reset();
    }

    showNotification(message, type) {
        // Create notification element
        const notification = document.createElement('div');
        notification.className = `form-notification ${type}`;
        notification.innerHTML = `
            <i class="fas ${type === 'success' ? 'fa-check-circle' : 'fa-exclamation-circle'}"></i>
            ${message}
        `;

        // Add to page
        this.form.appendChild(notification);

        // Remove after delay
        setTimeout(() => {
            notification.classList.add('fade-out');
            setTimeout(() => notification.remove(), 300);
        }, 3000);
    }
}

// Initialize contact form when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new ContactForm();
}); 