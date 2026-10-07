const loadLessons = () => {
    fetch("https://openapi.programming-hero.com/api/levels/all") // promise of response;
    .then(res => res.json()) // promise of json data
    .then(jsonData => {
        displayLessons(jsonData.data);
    }); 
};

const loadLevelWord = (id) => {
    // console.log(id);
    const url = `https://openapi.programming-hero.com/api/level/${id}`;
    fetch(url)
    .then(res => res.json())
    .then(data => {
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
        return;
    }

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
                <button class="btn bg-[#1A91FF]/10 text-[#374957] border-none rounded-lg"><i class="fa-solid fa-circle-info"></i></button>
                <button class="btn bg-[#1A91FF]/10 text-[#374957] border-none rounded-lg"><i class="fa-solid fa-volume"></i></button>
            </div>
        </div>
        `;

        wordContainer.append(card);
    });
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
            <button onclick = "loadLevelWord(${lesson.level_no})" class="btn btn-outline border-2 btn-primary"><i class="fa-solid fa-book-open"></i>Lesson-${lesson.level_no}</button>
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