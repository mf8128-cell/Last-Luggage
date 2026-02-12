const STORAGE_KEY = 'last_luggage_save';

const INCORRECT_MESSAGES = [
    "うーん、そこじゃないのかな……。ごめんね、もう一回日記の言葉を二人でよく見てみよう？",
    "えっ、そうなのかな……？ お兄ちゃんの書いてることと、なんだか食い違ってる気がするんだよね。",
    "ごめん、私も調べてみたんだけど、日記の内容と繋がらないみたい。他に心当たりないかな……？",
    "検索が難しいかな……。日付とか、お兄ちゃんがわざわざ『』で書いてる言葉に注目してみて！",
    "そっか……。でもあの独特な表現、もしかしたら別の有名な場所を指してるのかも。もう一度一緒に考えて？"
];

const scenario = [
    { type: "saki", text: "はじめまして。突然のメッセージ、すみません。", wait: 10000 },
    { type: "saki", text: "3年前にいなくなった兄の件で、どうしてもお力をお借りしたくて連絡しました。ある方から、${userName}さんならこの日記を読み解けるかもしれないと伺って……。", wait: 10000 },
    { type: "talk", text: "協力していただけるならメッセージ下さい！", wait: 10000 },
    { type: "saki", text: "返信ありがとうございます！ ", wait: 10000 },
    { type: "saki", text: "数日前、3年前に失踪した兄の当時の手荷物が落とし物センター経由でうちへ届きました。", wait: 10000 },
    { type: "saki", text: "中には使い込まれたノートが一冊入ってましたが、私には兄がどこに行っていたのか全く分かりませんでした……。", wait: 10000 },
    { type: "saki", text: "${userName}さん、お兄ちゃんを探すために協力してもらえると嬉しいです！ 早速、鞄に入っていた日記の最初のページを見せますね。", wait: 10000 },
    { type: "saki", text: "2023年4月14日。お兄ちゃんが失踪した直後の日付。", wait: 10000 },
    { type: "saki", text: "これ、どこのことなのか分かりますか？", wait: 10000 },
    {
        type: "quest",
        id: 1,
        img: "diary1.jpg",
        text: "",
        answer: ["新宿", "歌舞伎町タワー", "東急歌舞伎町タワー"],
        correct: "ああ、新宿の歌舞伎町タワー！開業したばかりの時ですね！お兄ちゃん、あの場所にいたんだ……。 ", wait: 10000,
    },
    { type: "saki", text: "実はお兄ちゃん、あの巨大な三毛猫の動画が好きだったんです。でも、何でわざわざここへ…？", wait: 10000 },
    { type: "saki", text: "それじゃあ次のページも見てくれますか？", wait: 10000 },
    { type: "saki", text: "次は5月19日。お兄ちゃんと私がこの街に訪れた時の話が書いてある……。", wait: 10000 },
    { type: "saki", text: "お兄ちゃんはどこに行っていたのか分かりますか？", wait: 10000 },
    {
        type: "quest",
        id: 2,
        img: "diary2.jpg",
        text: "",
        answer: ["倉敷", "美観地区"],
        nearMiss: [
            { trigger: "岡山", response: "これ岡山のことなんだ！でも、具体的にどこなんだろう？赤い煉瓦ってかなりヒントになりそうだけど……。" }
        ],
        correct: "たしかに、倉敷！美観地区だよね。", wait: 10000,
    },
    { type: "saki", text: "お兄ちゃん、東京の次は岡山に行ってたんだ……。", wait: 10000 },
    { type: "saki", text: "あそこの大原美術館を見て、私が神様がいるみたいって言ってたの、お兄ちゃん覚えててくれたんだ……。", wait: 10000 },
    { type: "saki", text: "なんだか、お兄ちゃんがすぐ側にいるみたい。", wait: 10000 },
    { type: "saki", text: "次の日記は8月31日。" , wait: 10000},
    { type: "saki", text: "日記の最後の方がちょっと変じゃないですか？" , wait: 10000},
    { type: "saki", text: "「大事なものが消えていくみたい」だなんて、どういうことだろう……。" , wait: 10000},
    { type: "saki", text: "とりあえず、お兄ちゃんが今どこにいるか突き止めなきゃ。" , wait: 10000},
    { type: "saki", text: "この「巨人がいた場所」って、どこか心当たりありますか？" , wait: 10000},
    {
        type: "quest",
        id: 3,
        img: "diary3.jpg",
        text: "",
        answer: ["山下ふ頭"],
        nearMiss: [
            { trigger: "横浜", response: "やっぱり横浜だよね！ 私もそう思う！ でも、具体的にどこなんだろう？ 横浜の海沿いのどこかだと思うんだけど……。" }
        ],
        correct: "山下ふ頭だ……！ ", wait: 10000,
    },
    { type: "saki", text: "あの大きなガンダム、一緒に見に行ったもんね。", wait: 10000},
    { type: "saki", text: "……ねえ、お兄ちゃんの日記、なんだか少し悲しい。", wait: 10000},
    { type: "saki", text: "早く見つけてあげないと、本当にお兄ちゃんがどこかへ行っちゃいそうで怖いよ。", wait: 10000 },
    { type: "saki", text: "お兄ちゃん、私との思い出の場所や私が行きたかった場所を順番に巡ってる……。", wait: 10000 },
    { type: "saki", text: "次は11月11日の日記です。", wait: 10000 },
    { type: "saki", text: "お兄ちゃんはどこに行っていたんでしょうか……。", wait: 10000 },
    {
        type: "quest",
        id: 4,
        img: "diary4.jpg",
        text: "",
        answer: ["父母ヶ浜"],
        nearMiss: [
            { trigger: "香川", response: "瀬戸大橋を見て天国まで行けるんじゃって話をしたのは覚えてるから香川県で間違いないと思います！ でも、香川県のどこなんだろう……。" }
        ],
        correct: "はっきり書かれてなかったから気が付かなかったけど香川の父母ヶ浜だ……。私がずっと憧れてた場所。", wait: 10000,
    },
    { type: "saki", text: "お兄ちゃん、その景色を私に見せたかったんだね。", wait: 10000 },
    { type: "saki", text: "これが最後の日記。2024年の元日。お兄ちゃん、私の住んでる街に来てたんだ……。", wait: 10000 },
    { type: "saki", text: "お兄ちゃん、最後はどこで待ってるつもりなんだろう……。", wait: 10000 },
    {
        type: "quest",
        id: 5,
        img: "diary5.jpg",
        text: "",
        answer: ["三越", "三越ライオン広場", "ライオン広場"],
        nearMiss: [
            { trigger: "天神", response: "うん、福岡の天神にいるのは間違いないと思う！ でも、天神って人が凄く多いし、具体的な場所が分からないと会えないよ……。" },
            { trigger: "福岡", response: "福岡のどこかにいるのは確かなんだけど……銀色のライオンってどこのことだろう？" }
        ],
        correct: "……三越のライオン前。", wait: 10000,
    },
    { type: "saki", text: "そうだ、迷子になった時はいつもあそこで待ち合わせしてた……。", wait: 10000 },
    { type: "saki", text: "今すぐ向かってみる！", wait: 2000 },
    { type: "saki", text: "どうしよう、${userName}さん、お兄ちゃん、すぐそこにいたのに。私、気づいてあげられなかった……！", wait: 10000 },
    { type: "saki", text: "……今、駅の忘れ物センターに問い合わせたら、この鞄は西鉄福岡駅のベンチに置かれてたんだって。パニックになって保護されてたみたい。", wait: 10000},
    { type: "saki", text: "謎を解いてくれたおかげで、お兄ちゃんが最後にいた場所がわかった。今、市内の療養施設に身元不明で預けられている男性がいるって。今から行ってくる！", wait: 10000 },
    { type: "saki", text: "${userName}さん、会えたよ。お兄ちゃんに。", wait: 30000 },
    { type: "saki", text: "私の顔を見ても、最初はきょとんとしてた。……私のこと、妹だって分からなかったみたい。" , wait: 15000 },
    { type: "saki", text: "お兄ちゃん、若年性アルツハイマーだって……。", wait: 15000 },
    { type: "saki", text: "でも、お兄ちゃんがずっと握りしめてたものがあったの。これだよ。", wait: 10000 }, 
    { img: "dragon_charm.jpg", wait: 10000 },
    { type: "saki", text: "これ、太宰府で見つけたって言ってた縁起物だよね。", wait: 10000 },
    { type: "saki", text: "ビニール袋の中に、小さなメモが入ってたの。${userName}さんに、一番に読んでほしい。", wait: 20000 },
    { img: "final_letter.jpg", wait: 10000 },
    { type: "saki", text: "お兄ちゃん、私の名前は思い出せなかったけど、この龍を渡したら「……これ、サキに。」って、私の名前だけ呼んでくれたんだ。", wait: 20000 },
    { type: "saki", text: "記憶がなくなっても、お兄ちゃんはお兄ちゃんだった。", wait: 15000 },
    { type: "saki", text: "本当に、本当にありがとう。${userName}さん、またね！", isLast: true , wait: 10000 }
];

// --- 以下、ロジック部分は共通 ---
let gameState = { userName: "", currentStep: 0, isQuestActive: false, isTalkActive: false };

const loginScreen = document.getElementById('login-screen');
const chatScreen = document.getElementById('chat-screen');
const chatWindow = document.getElementById('chat-window');
const nameInput = document.getElementById('user-name-input');
const startBtn = document.getElementById('start-btn');
const userInput = document.getElementById('user-input');
const sendBtn = document.getElementById('send-btn');
const typingIndicator = document.getElementById('typing-indicator');

window.onload = () => {
    const savedData = localStorage.getItem(STORAGE_KEY);
    if (savedData) {
        gameState = JSON.parse(savedData);
        showChatScreen();
        restoreChat();
    }
};

startBtn.onclick = () => {
    const name = nameInput.value.trim();
    if (!name) return alert("名前を入力してください");
    gameState.userName = name;
    showChatScreen();
    saveGame();
    processNextStep();
};

userInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' && !e.isComposing) {
        sendBtn.click();
    }
});

function showChatScreen() {
    loginScreen.classList.add('hidden');
    chatScreen.classList.remove('hidden');
}

function addMessage(text, type, img = null) {
    const cleanText = text ? text.replace(/\${userName}/g, gameState.userName) : "";
    const row = document.createElement('div');
    row.className = `message-row ${type}-row`;

    if (type === 'saki') {
        const icon = document.createElement('div');
        icon.className = 'icon';
        row.appendChild(icon);
        if (navigator.vibrate) navigator.vibrate(50);
    }

    const bubble = document.createElement('div');
    bubble.className = 'bubble';

    if (img) {
        const image = document.createElement('img');
        image.src = img;
        image.className = 'diary-img';
        image.onclick = () => {
            const overlay = document.getElementById('image-overlay');
            const overlayImg = document.getElementById('overlay-img');
            if (overlayImg) {
                overlayImg.src = image.src;
                overlay.style.display = 'flex';
            }
        };
        bubble.appendChild(image);
    }

    if (text && text !== "") {
        const span = document.createElement('span');
        span.innerText = cleanText;
        bubble.appendChild(span);
    }

    if (img || (text && text !== "")) {
        row.appendChild(bubble);
        chatWindow.appendChild(row);
        chatWindow.scrollTop = chatWindow.scrollHeight;
    }
}

async function processNextStep() {
    if (gameState.currentStep >= scenario.length) return;
    const stepData = scenario[gameState.currentStep];
    
    const baseWait = (stepData.text && stepData.text.length > 0) ? (stepData.text.length * 100) : 1000;
    const waitTime = stepData.wait || (baseWait + 500);

    typingIndicator.style.display = 'block';
    await new Promise(r => setTimeout(r, waitTime)); 
    typingIndicator.style.display = 'none';

    addMessage(stepData.text, 'saki', stepData.img);

    if (stepData.type === "talk") {
        gameState.isTalkActive = true;
    } else if (stepData.type === "quest") {
        gameState.isQuestActive = true;
    } else {
        if (stepData.isLast) {
            startEndingCinematic();
        } else {
            gameState.currentStep++;
            saveGame();
            processNextStep();
        }
    }
}

sendBtn.onclick = async () => {
    const text = userInput.value.trim();
    if (!text) return;

    addMessage(text, 'player');
    userInput.value = '';

    if (gameState.isTalkActive) {
        gameState.isTalkActive = false;
        gameState.currentStep++;
        saveGame();
        processNextStep();
    } 
    else if (gameState.isQuestActive) {
        const currentQuest = scenario[gameState.currentStep];
        const isCorrect = currentQuest.answer.some(ans => text.includes(ans));

        if (isCorrect) {
            gameState.isQuestActive = false;
            typingIndicator.style.display = 'block';
            await new Promise(r => setTimeout(r, 2000));
            typingIndicator.style.display = 'none';
            addMessage(currentQuest.correct, 'saki');
            gameState.currentStep++;
            saveGame();
            processNextStep();
        } 
        else if (currentQuest.nearMiss && currentQuest.nearMiss.some(nm => text.includes(nm.trigger))) {
            const matchedNearMiss = currentQuest.nearMiss.find(nm => text.includes(nm.trigger));
            typingIndicator.style.display = 'block';
            await new Promise(r => setTimeout(r, 1500));
            typingIndicator.style.display = 'none';
            addMessage(matchedNearMiss.response, 'saki');
        }
        else {
            const msg = INCORRECT_MESSAGES[Math.floor(Math.random() * INCORRECT_MESSAGES.length)];
            typingIndicator.style.display = 'block';
            await new Promise(r => setTimeout(r, 1500));
            typingIndicator.style.display = 'none';
            addMessage(msg, 'saki');
        }
    }
};

function startEndingCinematic() {
    const endingLayer = document.getElementById('ending-layer');
    const creditName = document.getElementById('credit-user-name');
    creditName.innerText = gameState.userName;
    setTimeout(() => {
        endingLayer.classList.remove('hidden');
        setTimeout(() => endingLayer.classList.add('active'), 100);
    }, 5000);
}

function restoreChat() {
    chatWindow.innerHTML = '';
    for (let i = 0; i < gameState.currentStep; i++) {
        const step = scenario[i];
        addMessage(step.text, 'saki', step.img);
        if (step.type === "talk" || step.type === "quest") {
            addMessage("（返信済み）", 'player');
            if (step.type === "quest") addMessage(step.correct, 'saki');
        }
    }
    processNextStep();
}

function saveGame() { localStorage.setItem(STORAGE_KEY, JSON.stringify(gameState)); }

document.getElementById('menu-trigger').onclick = (e) => {
    e.stopPropagation();
    document.getElementById('dropdown-menu').classList.toggle('hidden');
};
document.addEventListener('click', () => document.getElementById('dropdown-menu').classList.add('hidden'));

function confirmReset() {
    if (confirm("最初からやり直しますか？")) {
        localStorage.removeItem(STORAGE_KEY);
        location.reload();
    }
}
document.getElementById('menu-reset').onclick = confirmReset;
document.getElementById('header-back').onclick = confirmReset;

if (window.visualViewport) {
    const adjust = () => {
        document.body.style.height = window.visualViewport.height + 'px';
        chatWindow.scrollTop = chatWindow.scrollHeight;
    };
    window.visualViewport.addEventListener('resize', adjust);
    userInput.addEventListener('focus', () => setTimeout(adjust, 300));
}

const imageOverlay = document.getElementById('image-overlay');
if (imageOverlay) {
    imageOverlay.onclick = function() {
        this.style.display = 'none';
        const overlayImg = document.getElementById('overlay-img');
        if (overlayImg) overlayImg.src = "";
    };
}
