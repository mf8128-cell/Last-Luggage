const STORAGE_KEY = 'last_luggage_save';

const INCORRECT_MESSAGES = [
    "うーん、そこじゃないのかな……。ごめんね、もう一回日記の言葉を二人でよく見てみよう？",
    "えっ、そうなのかな……？ お兄ちゃんの書いてることと、なんだか食い違ってる気がするんだよね。",
    "ごめん、私も調べてみたんだけど、日記の内容と繋がらないみたい。他に心当たりないかな……？",
    "検索が難しいかな……。日付とか、お兄ちゃんがわざわざ『』で書いてる言葉に注目してみて！",
    "そっか……。でもあの独特な表現、もしかしたら別の有名な場所を指してるのかも。もう一度一緒に考えて？"
];

const scenario = [
    { type: "saki", text: "はじめまして。突然のメッセージ、すみません。" },
    { type: "saki", text: "3年前にいなくなった兄の件で、どうしてもお力をお借りしたくて連絡しました。ある方から、${userName}さんならこの日記を読み解けるかもしれないと伺って……。" },
    { type: "talk", text: "協力していただけるならメッセージ下さい！" },
    { type: "saki", text: "返信ありがとうございます！ " },
    { type: "saki", text: "数日前、3年前に失踪した兄の当時の手荷物が落とし物センター経由でうちへ届きました。" },
    { type: "saki", text: "中には使い込まれたノートが一冊入ってましたが、私には何のことが書かれているのか全く分かりませんでした……。" },
    { type: "saki", text: "${userName}さん、お兄ちゃんを探すために協力してもらえると嬉しいです！ 早速、鞄に入っていた日記の最初のページを見せますね。" },
    { type: "saki", text: "2023年4月14日。お兄ちゃんが失踪した直後の日付。" },
    { type: "saki", text: "これ、どこのことなのか分かりますか？" },
    {
        type: "quest",
        id: 1,
        img: "diary1.jpg",
        text: "",
        answer: ["新宿", "歌舞伎町タワー", "東急歌舞伎町タワー"],
        correct: "ああ、新宿の歌舞伎町タワー！開業したばかりの時ですね！お兄ちゃん、あの場所にいたんだ……。 ", wait: 10000,
    },
    { type: "saki", text: "実はお兄ちゃん、あの巨大な三毛猫の動画が好きだったんです。でも、何でわざわざここへ…？" },
    { type: "saki", text: "それじゃあ次のページも見てくれますか？", wait: 10000 },
    { type: "saki", text: "次は5月19日。私たちがお母さんのために鶴を折った話が書いてある……。" },
    { type: "saki", text: "お兄ちゃんはどこに行っていたのか分かりますか？" },
    {
        type: "quest",
        id: 2,
        img: "diary2.jpg",
        text: "",
        answer: ["平和記念公園", "広島平和記念公園", "平和公園", "おりづるタワー"],
        correct: "これ、やっぱり平和記念公園だ。日付的にも広島でG7サミットがあった日ですね。", wait: 10000,
    },
    { type: "saki", text: "お兄ちゃん、お母さんの入院中もずっと鶴を折ってくれてたんです。" },
    { type: "saki", text: "一番たくさん折ってたのがお兄ちゃんだったっけ。" },
    { type: "saki", text: "でも『心の中の争い』なんて……お兄ちゃん、ずっと一人で何かと戦ってたの？", wait: 7000 },
    { type: "saki", text: "次の日記は8月31日。……あの日、私もこの『青い月』を見てた。" , wait: 10000},
    { type: "saki", text: "でもこの月自体は全国的に見れたみたいだし……${userName}さん、詳しい場所に心当たりはありますか？" },
    {
        type: "quest",
        id: 3,
        img: "diary3.jpg",
        text: "",
        answer: ["シーキャンドル", "江の島シーキャンドル", "展望灯台", "江ノ島シーキャンドル"],
        correct: "そうだ、シーキャンドルの満月限定ライトアップだ……。 ", wait: 10000,
    },
    { type: "saki", text: "${userName}さん、ここね、私が小さい頃に迷子になった場所なの。", wait: 5000 },
    { type: "saki", text: "真っ暗で怖くて泣いてた私を、お兄ちゃんが見つけてくれたんだ。「もう大丈夫だよ」って。" , wait: 5000},
    { type: "saki", text: "視界がぼやけるって……", wait: 5000 },
    { type: "saki", text: "泣きながら書いてたのかな？" , wait: 5000},
    { type: "saki", text: "次は日付は書いてないけど新しいお店？ができた日みたい。", wait: 10000 },
    {
        type: "quest",
        id: 4,
        img: "diary4.jpg",
        text: "",
        answer: ["Nintendo KYOTO", "任天堂 京都", "任天堂　京都", "京都高島屋", "京都の任天堂", "京都の任天堂ストア", "京都のニンテンドー", "京都のニンテンドーストア"],
        correct: "Nintendo KYOTO……。私の誕生日、この数日後だった。", wait: 10000,
    },
    { type: "saki", text: "私がずっとマリオのグッズ欲しいって言ってたから、内緒で買いに行ってくれたんだね。", wait: 5000 },
    { type: "saki", text: "……でも、私の誕生日を忘れるなんて、お兄ちゃん、絶対におかしいよ。", wait: 10000 },
    { type: "saki", text: "最後の日記。2024年の元日。お兄ちゃん、私の住んでる街に来てたんだ……。", wait: 10000 },
    { type: "saki", text: "この『屋根に森がある場所』ってどこだろう？", wait: 10000 },

    {
        type: "quest",
        id: 5,
        img: "diary5.jpg",
        text: "",
        answer: ["太宰府天満宮", "太宰府", "仮殿"],
        correct: "太宰府天満宮の仮殿……。私の家のすぐ近くだよ。お兄ちゃん、ここまで来てたんだ。", wait: 10000,
    },
    { type: "saki", text: "……えっ、日記の最後、途中で力尽きたみたいになってる。" },
    { type: "saki", text: "どうしよう、${userName}さん、お兄ちゃん、すぐそこにいたのに。私、気づいてあげられなかった……！" },
    { type: "saki", text: "……今、駅の忘れ物センターに問い合わせたら、この鞄は西鉄福岡駅のベンチに置かれてたんだって。", wait: 20000 },
    { type: "saki", text: "お兄ちゃん、そこでパニックになって保護されてたみたい。",  wait: 15000 },
    { type: "saki", text: "${userName}さんが謎を解いてくれたおかげで、お兄ちゃんが最後にいた場所がわかった。", wait: 10000 },
    { type: "saki", text: "今、市内の療養施設に身元不明で預けられている男性がいるって。今から行ってくる！", wait: 10000 },
    { type: "saki", text: "本当にありがとう。${userName}さんがいなかったら、私、お兄ちゃんの想いに一生気づけなかった。……また、落ち着いたら連絡するね！" },
    { type: "saki", text: "${userName}さん、会えたよ。お兄ちゃんに。", wait: 30000 },
    { type: "saki", text: "療養施設で聞いたんだけど、お兄ちゃんは若年性アルツハイマーだって診断されたみたい……。", wait: 30000 },
    { type: "saki", text: "私の顔を見ても、最初はきょとんとしてた。……私のこと、妹だって分からなかったみたい。" , wait: 15000 },
    { type: "saki", text: "でも、お兄ちゃんがずっと握りしめてたものがあったの。これだよ。", wait: 15000 }, 
    { img: "dragon_charm.jpg", wait: 15000 },
    { type: "saki", text: "これ、太宰府で見つけたって言ってた縁起物だよね。", wait: 10000},
    { type: "saki", text: "ビニール袋の中に、小さなメモが入ってたの。${userName}さんに、一番に読んでほしい。", wait: 20000},
    { img: "final_letter.jpg", wait: 15000},
    { type: "saki", text: "お兄ちゃん、私の名前は思い出せなかったけど、この龍を渡したら『……これ、サキに。』って、私の名前だけ呼んでくれたんだ。" , wait: 20000},
    { type: "saki", text: "記憶がなくなっても、お兄ちゃんはお兄ちゃんだった。", wait: 15000 },
    { type: "saki", text: "${userName}さんが日記を繋いでくれなかったら、私はこの言葉に一生辿り着けなかったよ。", wait: 15000 },
    { type: "saki", text: "本当に、本当にありがとう。" , wait: 8000 },
    { type: "saki", text: "……じゃあ、今度こそ。またね！ ${userName}さんも、良い一日を！", isLast: true , wait: 10000}
];
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
    
    image.onclick = (e) => {
        e.stopPropagation(); // 吹き出し自体のクリックイベントなどが反応しないようにする
        const overlay = document.getElementById('image-overlay');
        
        // 拡大
        image.classList.add('enlarged');
        overlay.style.display = 'block';

        // 閉じる処理（画像をクリックしても背景をクリックしても閉じる）
        const closeImage = () => {
            image.classList.remove('enlarged');
            overlay.style.display = 'none';
            overlay.onclick = null; // イベントを解除
            image.onclick = (e) => { // 元の拡大処理に戻す
                /* ここに自分自身の再クリック処理を再帰的に書くか、
                   関数として外に切り出すのが理想です。 */
                location.reload(); // 一番確実なのは現状の再定義ですが、
                                   // 下記の「改善案」を推奨します。
            };
        };
        
        // 拡大中にクリックしたら閉じる設定
        overlay.onclick = closeImage;
        image.onclick = closeImage;
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
    
    const baseWait = (stepData.text && stepData.text.length > 0) ? (stepData.text.length * 100) : 1500;
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
        } else {
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

// メニュー・リセット処理
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

// スマホ画面調整
if (window.visualViewport) {
    const adjust = () => {
        document.body.style.height = window.visualViewport.height + 'px';
        chatWindow.scrollTop = chatWindow.scrollHeight;
    };
    window.visualViewport.addEventListener('resize', adjust);
    userInput.addEventListener('focus', () => setTimeout(adjust, 300));
}
