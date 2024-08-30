document.addEventListener('DOMContentLoaded', function () {
    const addItemBtn = document.getElementById('addItemBtn');
    const itemsList = document.getElementById('itemsList');
    const itemNameInput = document.getElementById('itemName');
    const itemQuantityInput = document.getElementById('itemQuantity');
    const themeToggle = document.getElementById('themeToggle');
    const moonIcon = document.getElementById('moonIcon');
    const sunIcon = document.getElementById('sunIcon');
    const micButton = document.getElementById('micButton');

    // إعداد الوضع المظلم
    themeToggle.addEventListener('click', function () {
        document.body.classList.toggle('dark-mode');
        themeToggle.classList.toggle('active');
        moonIcon.classList.toggle('fa-sun', !document.body.classList.contains('dark-mode'));
        moonIcon.classList.toggle('fa-moon', document.body.classList.contains('dark-mode'));
        sunIcon.classList.toggle('fa-sun', document.body.classList.contains('dark-mode'));
        sunIcon.classList.toggle('fa-moon', !document.body.classList.contains('dark-mode'));
    });

    // التحقق من دعم متصفح Web Speech API
    if ('webkitSpeechRecognition' in window) {
        const recognition = new webkitSpeechRecognition();
        recognition.continuous = false;
        recognition.interimResults = false;
        recognition.lang = 'ar-SA'; // اللغة العربية

        micButton.addEventListener('click', function () {
            recognition.start();
            micButton.classList.add('listening'); // تغيير مظهر الزر أثناء الاستماع
        });

        recognition.onresult = function (event) {
            const transcript = event.results[0][0].transcript;
            itemNameInput.value = transcript;
        };

        recognition.onspeechend = function () {
            recognition.stop();
            micButton.classList.remove('listening');
        };

        recognition.onerror = function (event) {
            console.error('حدث خطأ أثناء التعرف على الصوت: ', event.error);
            micButton.classList.remove('listening');
        };
    } else {
        console.warn('متصفحك لا يدعم Web Speech API.');
        micButton.disabled = true; // تعطيل زر الميكروفون في حالة عدم وجود دعم
    }

    // وظيفة إضافة العناصر
    function addItem() {
        const itemName = itemNameInput.value.trim();
        const itemQuantity = itemQuantityInput.value.trim();

        if (itemName === '') return; // تجنب إضافة عناصر فارغة

        const listItem = document.createElement('li');
        listItem.textContent = `${itemName} - الكمية: ${itemQuantity}`;
        
        const deleteBtn = document.createElement('button');
        deleteBtn.className = 'delete-btn';
        deleteBtn.textContent = 'حذف';
        deleteBtn.addEventListener('click', function () {
            listItem.remove();
        });

        listItem.appendChild(deleteBtn);
        itemsList.appendChild(listItem);

        itemNameInput.value = '';
        itemQuantityInput.value = '';
    }

    addItemBtn.addEventListener('click', addItem);
});
