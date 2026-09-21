document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("registrationForm");
    const name = document.getElementById("name");
    const password = document.getElementById("password");
    const passwordConfirm = document.getElementById("passwordConfirm");
    const email = document.getElementById("email");
    const status = document.getElementById("status");
    const subject = document.getElementById("subject");
    const message = document.getElementById("message");
    const successMessage = document.getElementById("successMessage");

    // Функция изменения состояния поля и вывода текста ошибки
    function setState(field, state, errorText, errorId) {
        field.classList.remove("valid", "invalid", "empty");

        const errorElement = document.getElementById(errorId);
        if (errorElement) {
            errorElement.textContent = errorText || "";
        }

        if (state === "valid") {
            field.classList.add("valid");
        } else if (state === "invalid") {
            field.classList.add("invalid");
        } else if (state === "empty") {
            field.classList.add("empty");
        }
    }

    // Проверка имени
    function validateName() {
        const nameValue = name.value.trim();

        if (nameValue === "") {
            setState(name, "invalid", "Введите имя", "nameError");
            return false;
        }

        if (nameValue.length < 2) {
            setState(name, "invalid", "Имя должно содержать не менее 2 символов", "nameError");
            return false;
        }

        setState(name, "valid", "", "nameError");
        return true;
    }

    // Проверка пароля
    function validatePassword() {
        const passwordValue = password.value.trim();

        if (passwordValue === "") {
            setState(password, "invalid", "Введите пароль", "passwordError");
            return false;
        }

        if (passwordValue.length < 2) {
            setState(password, "invalid", "Пароль должен содержать не менее 2 символов", "passwordError");
            return false;
        }

        setState(password, "valid", "", "passwordError");
        return true;
    }

    // Проверка подтверждения пароля
    function validatePasswordConfirm() {
        const value = passwordConfirm.value;

        if (value === "") {
            setState(passwordConfirm, "invalid", "Подтвердите пароль", "passwordConfirmError");
            return false;
        }

        if (value !== password.value) {
            setState(passwordConfirm, "invalid", "Пароли не совпадают", "passwordConfirmError");
            return false;
        }

        setState(passwordConfirm, "valid", "", "passwordConfirmError");
        return true;
    }

    // Проверка email
    function validateEmail() {
        const emailValue = email.value.trim();

        if (emailValue === "") {
            setState(email, "invalid", "Введите email", "emailError");
            return false;
        }

        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailPattern.test(emailValue)) {
            setState(email, "invalid", "Введите корректный email", "emailError");
            return false;
        }

        setState(email, "valid", "", "emailError");
        return true;
    }

    // Проверка пола
    function validateGender() {
        const genderValue = document.querySelector('input[name="gender"]:checked');
        const genderError = document.getElementById("genderError");

        if (!genderValue) {
            if (genderError) genderError.textContent = "Выберите пол";
            return false;
        }

        if (genderError) genderError.textContent = "";
        return true;
    }

    // Проверка статуса
    function validateStatus() {
        const statusValue = status.value;

        if (statusValue === "") {
            setState(status, "invalid", "Выберите статус", "statusError");
            return false;
        }

        setState(status, "valid", "", "statusError");
        return true;
    }

    // Проверка темы — НЕОБЯЗАТЕЛЬНОЕ поле
    function validateSubject() {
        const subjectValue = subject.value.trim();

        // Если пусто — это нормально
        if (subjectValue === "") {
            setState(subject, "empty", "", "subjectError");
            return true;
        }

        setState(subject, "valid", "", "subjectError");
        return true;
    }

    // Проверка сообщения — НЕОБЯЗАТЕЛЬНОЕ поле
    function validateMessage() {
        const messageValue = message.value.trim();

        // Если пусто — это нормально
        if (messageValue === "") {
            setState(message, "empty", "", "messageError");
            return true;
        }

        setState(message, "valid", "", "messageError");
        return true;
    }

    form.addEventListener("submit", function (event) {
        event.preventDefault();

        const isNameValid = validateName();
        const isPasswordValid = validatePassword();
        const isPasswordConfirmValid = validatePasswordConfirm();
        const isEmailValid = validateEmail();
        const isGenderValid = validateGender();
        const isStatusValid = validateStatus();
        const isSubjectValid = validateSubject();
        const isMessageValid = validateMessage();

        if (
            isNameValid &&
            isPasswordValid &&
            isPasswordConfirmValid &&
            isEmailValid &&
            isGenderValid &&
            isStatusValid &&
            isSubjectValid &&
            isMessageValid
        ) {
            successMessage.textContent = "Регистрация прошла успешно!";
        } else {
            successMessage.textContent = "";
        }
    });

    // Проверка полей во время ввода
    name.addEventListener("input", validateName);

    password.addEventListener("input", function () {
        validatePassword();
        if (passwordConfirm.value !== "") {
            validatePasswordConfirm();
        }
    });

    passwordConfirm.addEventListener("input", validatePasswordConfirm);
    email.addEventListener("input", validateEmail);
    status.addEventListener("change", validateStatus);
    subject.addEventListener("input", validateSubject);
    message.addEventListener("input", validateMessage);

    // Проверка радиокнопок
    const genderInputs = document.querySelectorAll('input[name="gender"]');
    genderInputs.forEach(function (radio) {
        radio.addEventListener("change", validateGender);
    });

    // Очистка формы
    form.addEventListener("reset", function () {
        setTimeout(function () {
            const fields = [name, password, passwordConfirm, email, status, subject, message];
            fields.forEach(function (field) {
                field.classList.remove("valid", "invalid");
                field.classList.add("empty");
            });
            document.querySelectorAll(".error-message").forEach(function (error) {
                error.textContent = "";
            });
            successMessage.textContent = "";
        }, 0);
    });
});