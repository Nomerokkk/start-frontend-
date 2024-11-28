document.querySelectorAll('.j-title').forEach((element) => {
    const html = element.innerHTML.trim(); // Сохраняем HTML с тегами
    element.innerHTML = ''; // Очищаем элемент

    const totalDuration = 1;
    const parser = new DOMParser();
    const parsedHtml = parser.parseFromString(html, 'text/html').body.childNodes; // Парсим HTML
    let count = 0;
    const letterCount = html.replace(/<[^>]*>/g, '').replace(/\s+/g, '').length; // Количество букв без тегов и пробелов
    const delayPerLetter = totalDuration / letterCount; // Задержка на каждую букву
    let textContent = ''; // Для хранения текста с пробелами

    // Проходим по каждому элементу в распарсенной структуре
    parsedHtml.forEach((node) => {
        if (node.nodeType === 3) {
            // Если это текстовый узел
            const words = node.textContent.split(' '); // Разбиваем текст на слова

            words.forEach((word, index) => {
                const wordSpan = document.createElement('span');
                wordSpan.classList.add('word');
                element.appendChild(wordSpan);

                [...word].forEach((letter) => {
                    const letterSpan = document.createElement('span');
                    letterSpan.classList.add('letter', 'j-wow', 'j-wow-right');
                    letterSpan.setAttribute('data-delay', count * delayPerLetter);
                    letterSpan.textContent = letter;
                    wordSpan.appendChild(letterSpan);
                    count++;
                });

                // Добавляем пробел между словами (кроме последнего слова)
                if (index < words.length - 1) {
                    textContent += ' '; // Добавляем пробел в общий текст
                    const spaceSpan = document.createElement('span');
                    spaceSpan.classList.add('space'); // Можно задать класс для стайлинга пробела
                    spaceSpan.textContent = ' ';
                    element.appendChild(spaceSpan);
                }
            });

            // Обновляем текстовый контент
            textContent += node.textContent + ' ';
        } else if (node.nodeType === 1 && node.tagName.toLowerCase() === 'b') {
            // Если это тег <b> или любой другой HTML элемент
            const boldWords = node.textContent.split(' '); // Разбиваем текст внутри <b> на слова
            const style = node.getAttribute('style') || ''; // Получаем стиль, если он есть

            const boldContainer = document.createElement('span');
            boldContainer.classList.add('word-red');
            if (style) boldContainer.setAttribute('style', style); // Применяем стиль
            element.appendChild(boldContainer);

            // Обрабатываем каждое слово в <b>
            boldWords.forEach((word, index) => {
                const wordSpan = document.createElement('span');
                wordSpan.classList.add('word');
                boldContainer.appendChild(wordSpan);

                [...word].forEach((letter) => {
                    const letterSpan = document.createElement('span');
                    letterSpan.classList.add('letter', 'j-wow', 'j-wow-right');
                    letterSpan.setAttribute('data-delay', count * delayPerLetter);
                    letterSpan.textContent = letter;
                    wordSpan.appendChild(letterSpan);
                    count++;
                });

                // Добавляем пробел между словами (кроме последнего слова)
                if (index < boldWords.length - 1) {
                    textContent += ' '; // Добавляем пробел в общий текст
                    const spaceSpan = document.createElement('span');
                    spaceSpan.classList.add('space'); // Можно задать класс для стайлинга пробела
                    spaceSpan.textContent = ' ';
                    boldContainer.appendChild(spaceSpan);
                }
            });

            // Обновляем текстовый контент
            textContent += node.textContent + ' ';
        }
    });

    // Устанавливаем весь текстовый контент в элемент для копирования
    element.setAttribute('data-text', textContent.trim());
    element.classList.add('show');
});