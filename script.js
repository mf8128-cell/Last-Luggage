const STORAGE_KEY = 'last_luggage_save';

const INCORRECT_MESSAGES = [
    "うーん、そこじゃないのかな……。ごめんね、私の読み方が悪いのかな。もう一回、日記の言葉を二人でよく見てみよう？",
    "えっ、そうなのかな……？ お兄ちゃんの書いてることと、なんだか微妙に食い違ってる気がするんだよね。別の可能性はないかな……？",
    "ごめん、私も${userName}さんが言ってくれた場所を検索してみたんだけど、日記の内容と繋がらないみたい。……他に、このキーワードに合う場所、心当たりない？",
    "うーん、検索の仕方が難しいのかな……。日付とか、お兄ちゃんがわざわざ『』で書いてる言葉を組み合わせて調べてみてほしいな！",
    "そっか……。でも、日記にあるあの独特な表現、もしかしたらもっと別の『有名な場所』を指してるのかも。${userName}さん、もう一度だけ一緒に考えてくれる？"
];

const scenario = [
    { type: "saki", text: "はじめまして。突然のメッセージ、すみません。" },
    { type: "saki", text: "3年前にいなくなった兄の件で、どうしてもお力をお借りしたくて連絡しました。ある方から、${userName}さんならこの日記を読み解けるかもしれないと伺って……。" },
    { type: "talk", text: "協力していただけるならメッセージ下さい！" },
    { type: "saki", text: "返信ありがとうございます！ " },
    { type: "saki", text: "${userName}さん、お兄ちゃんを探すために協力してもらえると嬉しいです！ 早速、鞄に入っていた日記の最初のページを見せますね。" },
    { type: "saki", text: "2023年4月14日。お兄ちゃんが失踪した直後の日付。" },
    { type: "saki", text: "これ、どこのことなのか分かりますか？" },
    {
        type: "quest",
        id: 1,
        img: "diary1.jpg",
        text: "",
        answer: ["新宿", "歌舞伎町タワー", "東急歌舞伎町タワー"],
        correct: "ああ、新宿の歌舞伎町タワー！開業したばかりの時ですね！お兄ちゃん、あの場所にいたんだ……。 ",
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
        correct: "これ、やっぱり平和記念公園だ。日付的にも広島でG7サミットがあった日ですね。",
    },
    { type: "saki", text: "お兄ちゃん、お母さんの入院中もずっと鶴を折ってくれてたっけ。" },
    { type: "saki", text: "一番たくさん折ってたのがお兄ちゃんだったっけ。" },
    { type: "saki", text: "でも『心の中の争い』なんて……お兄ちゃん、ずっと一人で何かと戦ってたの？" },
    { type: "saki", text: "次の日記は8月31日。……あの日、私もこの『青い月』を見てた。" , wait: 10000},
    { type: "saki", text: "でもこの月自体は全国的に見れたみたいだし……${userName}さん、詳しい場所に心当たりはありますか？" },
    {
        type: "quest",
        id: 3,
        img: "diary3.jpg",
        text: "",
        answer: ["シーキャンドル", "江の島シーキャンドル", "展望灯台", "江ノ島シーキャンドル"],
        correct: "シーキャンドルの満月限定ライトアップだ……。 ", wait: 5000,
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
        answer: ["Nintendo KYOTO", "任天堂 京都", "任天堂　京都", "京都高島屋"],
        correct: "Nintendo KYOTO……。私の誕生日、この数日後だった。", wait: 5000,
    },
    { type: "saki", text: "私がずっとマリオのグッズ欲しいって言ってたから、内緒で買いに行ってくれたんだね。" },
    { type: "saki", text: "……でも、私の誕生日を忘れるなんて、お兄ちゃん、絶対におかしいよ。" },
    { type: "saki", text: "最後の日記。2024年の元日。お兄ちゃん、私の住んでる街に来てたんだ……。", wait: 10000 },
    { type: "saki", text: "この『屋根に森がある場所』ってどこだろう？", wait: 10000 },

    {
        type: "quest",
        id: 5,
        img: "diary5.jpg",
        text: "",
        answer: ["太宰府天満宮", "太宰府", "仮殿"],
        correct: "太宰府天満宮の仮殿……。私の家のすぐ近くだよ。お兄ちゃん、ここまで来てたんだ。",
    },
    { type: "saki", text: "……えっ、日記の最後、途中で力尽きたみたいになってる。" },
    { type: "saki", text: "どうしよう、${userName}さん、お兄ちゃん、すぐそこにいたのに。私、気づいてあげられなかった……！" },
    { type: "saki", text: "……今、駅の忘れ物センターに問い合わせたら、この鞄は『西鉄福岡駅』のベンチに置かれてたんだって。", wait: 20000 },
    { type: "saki", text: "お兄ちゃん、そこでパニックになって保護されてたみたい。",  wait: 15000 },
    { type: "saki", text: "${userName}さんが謎を解いてくれたおかげで、お兄ちゃんが最後にいた場所がわかった。", wait: 10000 },
    { type: "saki", text: "今、市内の療養施設に身元不明で預けられている男性がいるって。今から行ってくる！", wait: 10000 },
    { type: "saki", text: "本当にありがとう。${userName}さんがいなかったら、私、お兄ちゃんの想いに一生気づけなかった。……また、落ち着いたら連絡するね！" },
    { type: "saki", text: "${userName}さん、会えたよ。お兄ちゃんに。", wait: 30000 },
    { type: "saki", text: "私の顔を見ても、最初はきょとんとしてた。……私のこと、妹だって分からなかったみたい。" , wait: 15000 },
    { type: "saki", text: "でも、お兄ちゃんがずっと握りしめてたものがあったの。これだよ。", wait: 15000 }, 
    { img: "dragon_charm.jpg" },
    { type: "saki", text: "これ、太宰府で見つけたって言ってた縁起物だよね。", wait: 10000},
    { type: "saki", text: "ビニール袋の中に、小さなメモが入ってたの。${userName}さんに、一番に読んでほしい。", wait: 20000},
    { img: "final_letter.jpg"},
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

// メッセージ表示関数（画像のみ対応に修正）
function addMessage(text, type, img = null) {
    // textがある場合のみ置換を行い、ない場合は空文字にする
    const cleanText = text ? text.replace(/\${userName}/g, gameState.userName) : "";
    const row = document.createElement('div');
    row.className = `message-row ${type}-row`;

    if (type === 'saki') {
        const icon = document.createElement('div');
        icon.className = 'icon';
        row.appendChild(icon);
        
        // 紗季からのメッセージ時に振動
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
            image.classList.toggle('enlarged');
            if (image.classList.contains('enlarged')) {
                overlay.style.display = 'block';
            } else {
                overlay.style.display = 'none';
            }
        };

        const overlay = document.getElementById('image-overlay');
        if(overlay) {
            overlay.onclick = () => {
                const enlargedImgs = document.querySelectorAll('.diary-img.enlarged');
                enlargedImgs.forEach(img => img.classList.remove('enlarged'));
                overlay.style.display = 'none';
            };
        }

        bubble.appendChild(image);
    }

    // テキストが空文字でない場合のみ表示用のspanを作成
    if (text && text !== "") {
        const span = document.createElement('span');
        span.innerText = cleanText;
        bubble.appendChild(span);
    }

    // 画像かテキストのいずれかがあれば行に追加
    if (img || (text && text !== "")) {
        row.appendChild(bubble);
        chatWindow.appendChild(row);
        chatWindow.scrollTop = chatWindow.scrollHeight;
    }
}

// 進行管理関数（テキストなしに対応に修正）
async function processNextStep() {
    if (gameState.currentStep >= scenario.length) return;
    const stepData = scenario[gameState.currentStep];
    
    // テキストがある場合は文字数計算、なければデフォルト値を使用
    const baseWait = (stepData.text && stepData.text.length > 0) ? (stepData.text.length * 100) : 800;
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
            await new Promise(r => setTimeout(r, 1500));
            typingIndicator.style.display = 'none';
            addMessage(currentQuest.correct, 'saki');
            
            gameState.currentStep++;
            saveGame();
            processNextStep();
        } else {
            const randomMsg = INCORRECT_MESSAGES[Math.floor(Math.random() * INCORRECT_MESSAGES.length)];
            const waitTime = (randomMsg.length * 100) + 800;

            typingIndicator.style.display = 'block';
            await new Promise(r => setTimeout(r, waitTime));
            typingIndicator.style.display = 'none';
            
            addMessage(randomMsg, 'saki');
        }
    }
};

function startEndingCinematic() {
    const endingLayer = document.getElementById('ending-layer');
    const creditName = document.getElementById('credit-user-name');
    
    if(creditName) creditName.innerText = gameState.userName;

    setTimeout(() => {
        if(endingLayer) {
            endingLayer.classList.remove('hidden');
            setTimeout(() => {
                endingLayer.classList.add('active');
            }, 100);
        }
    }, 5000);
}

function restoreChat() {
    chatWindow.innerHTML = '';
    for (let i = 0; i < gameState.currentStep; i++) {
        const step = scenario[i];
        addMessage(step.text, 'saki', step.img);
        if (step.type === "talk" || step.type === "quest") {
            addMessage("（返信済み）", 'player');
            if (step.type === "quest") {
                addMessage(step.correct, 'saki');
            }
        }
    }
    processNextStep();
}

function saveGame() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(gameState));
}

const menuTrigger = document.getElementById('menu-trigger');
const dropdownMenu = document.getElementById('dropdown-menu');
const headerBack = document.getElementById('header-back');
const menuReset = document.getElementById('menu-reset');

if (menuTrigger && dropdownMenu) {
    menuTrigger.onclick = (e) => {
        e.stopPropagation();
        dropdownMenu.classList.toggle('hidden');
    };
}

document.addEventListener('click', () => {
    if (dropdownMenu) dropdownMenu.classList.add('hidden');
});

function confirmReset() {
    if (confirm("これまでの物語をすべてリセットして、最初からやり直しますか？\n（保存されたデータは消去されます）")) {
        localStorage.removeItem(STORAGE_KEY);
        location.reload();
    }
}

if (headerBack) headerBack.onclick = confirmReset;
if (menuReset) menuReset.onclick = confirmReset;

if (window.visualViewport) {
    window.visualViewport.addEventListener('resize', () => {
        const viewHeight = window.visualViewport.height;
        document.body.style.height = viewHeight + 'px';
        setTimeout(() => {
            const chatWindow = document.getElementById('chat-window');
            if (chatWindow) chatWindow.scrollTop = chatWindow.scrollHeight;
        }, 100);
    });
}
