const loadLessons = () => {
    fetch("https://openapi.programming-hero.com/api/levels/all") // promise of response;
    .then(res => res.json()) // promise of json data
    .then(jsonData => {
        displayLessons(jsonData.data);
    }); 
};

const removeActive = () => {
    const lessonButtons = document.querySelectorAll(".lesson-btn");
    // console.log(lessonButtons);
    lessonButtons.forEach((btn) => {
        btn.classList.remove("active");
    });
};

const loadLevelWord = (id) => {
    manageLoading(true);
    const url = `https://openapi.programming-hero.com/api/level/${id}`;
    fetch(url)
    .then(res => res.json())
    .then(data => {
        removeActive();
        const clickBtn = document.getElementById(`lesson-btn-${id}`);
        // console.log(clickBtn);
        clickBtn.classList.add("active");
        displayLevelWord(data.data);
    });
};

const displayLevelWord = (words) => {
    const wordContainer = document.getElementById("word-container");
    wordContainer.innerHTML = " ";

    if(words.length === 0){
        wordContainer.innerHTML = `
        <div class="font-bangla text-center col-span-full space-y-3">
            <img class="mx-auto" src="assets/alert-error.png" alt="">
            <p class="text-[#79716B] text-[12px]">এই Lesson এ এখনো কোন Vocabulary যুক্ত করা হয়নি।</p>
            <h3 class="font-medium text-3xl">নেক্সট Lesson এ যান</h3>
        </div>
        `;
        manageLoading(false);
        return;
    };

// {
//     "id": 19,
//     "level": 1,
//     "word": "Sincere",
//     "meaning": "সত্‍ / আন্তরিক",
//     "pronunciation": "সিনসিয়ার"
// }

    words.forEach((word) => {
        console.log(word);

        const card = document.createElement("div");
        card.innerHTML = `
        <div class="bg-white text-center rounded shadow-sm px-20 py-12 space-y-6">
            <h2 class="font-english font-bold text-3xl ">${word.word ? word.word : "শব্দ পাওয়া যায়নি"}</h2>
            <p class="font-english">meaning /pronounciation</p>
            <div class="font-bangla font-semibold text-2xl text-[#18181B]/80">"${word.meaning ? word.meaning : "অর্থ পাওয়া যায়নি "} / ${word.pronunciation ? word.pronunciation : "pronunciation পাওয়া যায়নি"}"</div>
            <div class="flex justify-between items-center">
                <button onclick="loadWordDetails(${word.id})" class="btn bg-[#1A91FF]/10 text-[#374957] border-none rounded-lg"><i class="fa-solid fa-circle-info"></i></button>
                <button class="btn bg-[#1A91FF]/10 text-[#374957] border-none rounded-lg"><i class="fa-solid fa-volume"></i></button>
            </div>
        </div>
        `;

        wordContainer.append(card);
    });
    manageLoading(false);
    // return;
};

const loadWordDetails = async(id) => {
    const url = `https://openapi.programming-hero.com/api/word/${id}`;
    const res = await fetch(url);
    const details = await res.json();
    displayWordDetails(details.data);
}

// {
// "status": true,
// "message": "successfully fetched a word details",
// "data": {
// "word": "Eager",
// "meaning": "আগ্রহী",
// "pronunciation": "ইগার",
// "level": 1,
// "sentence": "The kids were eager to open their gifts.",
// "points": 1,
// "partsOfSpeech": "adjective",
// "synonyms": [
// "enthusiastic",
// "excited",
// "keen"
// ],
// "id": 5
// }
// }

const displayWordDetails = (word) => {
    console.log(word);
    const detailsBox = document.getElementById("details-container");
    detailsBox.innerHTML = `
    <div class="space-y-2">
    <h2 class="font-semibold text-4xl">${word.word} (<i class="fa-solid fa-microphone-lines"></i>:${word.pronunciation})</h2>
    </div>
    <div class="space-y-2">
        <h2 class="font-semibold text-2xl">$Meaning</h2>
        <p class="font-medium text-2xl">${word.meaning}</p>
    </div>
    <div class="space-y-2">
        <h2 class="font-semibold text-2xl">Example</h2>
        <p class="font-medium text-2xl">${word.sentence}</p>
    </div>
    <div class="space-y-2">
        <h2 class="font-semibold text-2xl">সমার্থক শব্দ গুলো</h2>
        <div class="flex gap-4">
        ${word.synonyms.map(synonym => `
            <p class="btn bg-[#EDF7FF] border-2 border-[#D7E4EF] rounded-md">${synonym}</p>
        `).join(" ")}
        </div>
    </div>
    `;
    document.getElementById("word_modal").showModal();
};

const manageLoading = (status) => {
    if(status === true){
        document.getElementById("loading").classList.remove("hidden");
        document.getElementById("word-container").classList.add("hidden");
    }else{
        document.getElementById("word-container").classList.remove("hidden");
        document.getElementById("loading").classList.add("hidden");
    }
};

const displayLessons = (lessons) => {
    // console.log(lessons);
    const levelContainer = document.getElementById("level-container");
    levelContainer.innerHTML = " ";

        // ------- using onclick method --------

    for(let lesson of lessons){
        console.log(lesson);
        const btnDiv = document.createElement("div");
        btnDiv.innerHTML = `
            <button id="lesson-btn-${lesson.level_no}" onclick = "loadLevelWord(${lesson.level_no})" class="btn btn-outline border-2 btn-primary lesson-btn"><i class="fa-solid fa-book-open"></i>Lesson-${lesson.level_no}</button>
        `;

        levelContainer.append(btnDiv);
    }

        // ------- using addEventListener method --------
    
    // for(let lesson of lessons){
    //     console.log(lessons);
    //     const btnDiv = document.createElement("div");
    //     btnDiv.innerHTML = `
    //         <button class="btn btn-outline border-2 btn-primary"><i class="fa-solid fa-book-open"></i>Lesson-${lesson.level_no}</button>
    //     `;
    //     const button = btnDiv.querySelector("button");
    //     button.addEventListener("click", () => {
    //         loadLevelWord(lesson.level_no);
    //     });

    //     levelContainer.append(btnDiv);
    // }
};

loadLessons();

document.getElementById("btn-search").addEventListener("click", () => {
    removeActive();
    const input = document.getElementById("input-search");
    const searchValue = input.value.trim().toLowerCase();
    console.log(searchValue);

    fetch("https://openapi.programming-hero.com/api/words/all")
    .then(res => res.json())
    .then(data => {
        const allWords = data.data;
        console.log(allWords);
        const filterWords = allWords.filter(word => word.word.toLowerCase().includes(searchValue));
        displayLevelWord(filterWords);
    });
});