const QUESTION_LENGTH = [7, 7, 7, 7];

const QUESTION_DICT = {
    Q00001: {
        text: '당신의 생일은 몇월입니까?',
        answers: ['A00001', 'A00001_1', 'A00001_2', 'A00001_3'],
    },
    Q00002: {
        text: '당신이 좋아하는 장르는?',
        answers: ['A00002', 'A00002_1','A00002_2','A00002_3'],
    },
    Q00003: {
        text: '여행을 간다면 어디로 가고싶나요?',
        answers: ['A00003', 'A00003_1', 'A00003_2', 'A00003_3'],
    },
    Q00004: {
        text: '당신이 싫어하는것은 무엇인가요?',
        answers: ['A00004', 'A00004_1', 'A00004_2', 'A00004_3'],
    },
    Q00005: {
        text: '당신의 성격은?',
        answers: ['A00005', 'A00005_1', 'A00005_2', 'A00005_3'],
    },
    Q00006: {
        text: '당신을 동물에 비유한다면?',
        answers: ['A00006', 'A00006_1', 'A00006_2', 'A00006_3'],
    },
    Q00007: {
        text: '당신이 중요하게 생각하는 가치관은?',
        answers: ['A00007', 'A00007_1', 'A00007_2', 'A00007_3'],
    }
    
};

const ANSWER_DICT = {
    // question 1
    A00001: {
        text: ' 1월 4월 8월',
        next: 'Q00002',
    },
    A00001_1: {
        text: ' 3월 6월 12월',
        next: 'Q00002',
    },
    A00001_2: {
        text: ' 5월 8월 10월',
        next: 'Q00002',
    },
    A00001_3: {
        text: ' 2월 7월 11월',
        next: 'Q00002',
    },
    // question 2
    A00002: {
        text: '드라마',
        next: 'Q00003',
    },
    A00002_1: {
        text: '영화',
        next: 'Q00003',
    },
    A00002_2: {
        text: '애니메이션',
        next: 'Q00003',
    },
    A00002_3: {
        text: '소설',
        next: 'Q00003',
    },
    // question 3
    A00003: {
        text: '온천',
        next: 'Q00004',
    },
    A00003_1: {
        text: '해외',
        next: 'Q00004',
    },
    A00003_2: {
        text: '호텔리조트',
        next: 'Q00004',
    },
    A00003_3: {
        text: '가까운 관광명소',
        next: 'Q00004',
    },
    // question 4
    A00004: {
        text: '혼나는것 ',
        next: 'Q00005',
    },
    A00004_1: {
        text: '혼자되는것 ',
        next: 'Q00005',
    },
    A00004_2: {
        text: '질질끄는것 ',
        next: 'Q00005',
    },
    A00004_3: {
        text: '지루한것 ',
        next: 'Q00005',
    },
    // question 5
    A00005: {
        text: '항상변한다 ',
        next: 'Q00006',
    },
    A00005_1: {
        text: '밝다 ',
        next: 'Q00006',
    },
    A00005_2: {
        text: '차갑고조용하다 ',
        next: 'Q00006',
    },
    A00005_3: {
        text: '천진난만하다 ',
        next: 'Q00006',
    },
    // question 6
    A00006: {
        text: '강아지 ',
        next: 'Q00007',
    },
    A00006_1: {
        text: '고양이 ',
        next: 'Q00007',
    },
    A00006_2: {
        text: '원숭이 ',
        next: 'Q00007',
    },
    A00006_3: {
        text: '사자 ',
        next: 'Q00007',
    },
    // question 7
    A00007: {
        text: '거짓말을 하지 않는다',
        next: null,
    },
    A00007_1: {
        text: '사람을 소중하게 대한다',
        next: null,
    },
    A00007_2: {
        text: '인생은 즐겁게 산다',
        next: null,
    },
    A00007_3: {
        text: '인생은 자유롭게산다 ',
        next: null,
    },
};

window.addEventListener('load', function () {
    const current = {
        number: 1,
        id: 'Q00001',
    };
    const selected = [];
    getCurrentQA(current, 0, selected);
});

function removeAllChildren(element) {
    while (element.childNodes.length > 0) {
        element.firstChild.remove();
    }
}

function getCurrentQA(current, length, selected) {
    console.log(current.id);
    // document.querySelector('img.main-image').setAttribute('src', QUESTION_DICT[current.id].img);
    document.querySelector('div.question-number').innerText = 'Question ' + current.number ;
    document.querySelector('div.question').innerText = QUESTION_DICT[current.id].text;

    const buttonWrapper = document.querySelector('div.button-wrapper');
    removeAllChildren(buttonWrapper);

    console.log(QUESTION_DICT[current.id].answers);
    for (const answer of QUESTION_DICT[current.id].answers) {
        const button = document.createElement('button');
        button.innerText = ANSWER_DICT[answer].text;
        button.setAttribute('data-id', answer);
        button.addEventListener('click', function (e) {
            if (length === 0) {
                const index = Array.from(buttonWrapper.childNodes).indexOf(e.target);
                length = QUESTION_LENGTH[index];
            }
            const id = e.target.getAttribute('data-id');
            current.number++;
            current.id = ANSWER_DICT[id].next;
            selected.push(ANSWER_DICT[id].text);
            if (current.id === null) {
                alert(selected.join('\n'));
                window.location.href="result.html";
                // window.location.reload();
                // TODO: REST API communication (need to send 'selected')
            } else {
                getCurrentQA(current, length, selected);
            }
        });
        buttonWrapper.appendChild(button);
    }

    if (length === 0) {
        document.querySelector('div.count > span.current').innerText = '1';
        document.querySelector('div.count > span.total').innerText = '?';
        document.querySelector('div.progress-inner').style.width = '0px';
    } else {
        document.querySelector('div.count > span.current').innerText = current.number;
        document.querySelector('div.count > span.total').innerText = length;
        const maxWidth = document.querySelector('div.progress').clientWidth;
        const curWidth = ((current.number - 1) * maxWidth) / (length - 1);
        document.querySelector('div.progress-inner').style.width = curWidth + 'px';
    }
}
