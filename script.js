let expandedCell = null;
let currentFilter = 'all';
const totalCells = 40;
let isMobile = false;

// 작가별 셀 할당 정보
const artistCellMapping = {
    1: [3, 7, 8, 10, 12, 18, 21, 25, 26, 28, 31, 33, 36, 37, 40],// 김유진
    2: [4, 14, 19, 24, 35],// 염아인
    3: [5, 9, 16, 20, 23, 29, 34],// 배현준
    4: [2, 13, 30, 39],// 배지원
    5: [1, 6, 11, 15, 17, 22, 27, 32, 38]// 이상민
};

// 작품 정보 데이터
const workData = {
  1: { title: "Bias Atlas", description: "Text-to-Image AI는 사용자가 입력한 문자 데이터를 바탕으로 AI가 과거에 학습한 시각적 패턴을 기준 삼아 '그럴듯한' 이미지를 만들어낸다. <Bias Atlas>는 Midjourney가 이미지를 생성할 때 나타나는 10가지 오류 유형을 통해 AI가 어떤 조건에서 '편향된 정보'를 개입시키는지 탐색한다." },
  2: { title: "무제", description: "박스 상자가 모여 있는 모습에서 ‘함께 있을 때의 따뜻함’과 ‘흩어졌을 때의 차가움’을 떠올려, 이를 사람 사이의 관계와 공동체의 온기에 비유해 오브제를 제작했다. 형태는 도시 건축 구조를 모티브로 하여 중심은 밀집되고 외곽은 퍼져 나가도록 구성했으며, 빨강을 사용해 온기와 에너지를 강조했다. 중심부는 겹침으로 진한 따뜻함을, 외곽은 옅어지는 차가움을 표현했다. 투명 아크릴과 레진은 겹쳐질수록 색이 짙어져 공동체의 따뜻한 밀도감을 드러냈다." },
  3: { title: "Move Don't Move", description: "커뮤니케이션디자인(1) 수업에서 진행한 디자인 작업물들을 총합한 프로세스 북이다. 약 160페이지 가량의 작업 설명과 과정이 들어가 있으며, Anneke Coppoolse 교수님의 지도 하에 디자인했다. 직접 사철제본을 했으며, 표지는 크래프트지에 레이저프린팅을 해서, 읽으면 읽을수록 지워지도록 했다." },
  4: { title: "램프워킹: 선택뭉치", description: "2024-2 과제전에서 유리와 도자를 활용해 테라리움을 제작한 경험을 바탕으로, 이번에는 램프워킹 기법을 적용해 모든 피스를 유리로 구성한 새로운 형태의 테라리움을 만들고 작은 조명을 더해 조명으로도 활용할 수 있게 했다. 나는 유리의 색을 고르고 형태를 늘리는 순간순간의 판단이 쌓여 작품이 완성된다고 보며, 이를 통해 작은 선택들이 어떻게 하나의 시각적 결과로 이어지는지를 보여주고자 했다. 단순한 조형에 그치지 않고 테라리움과 조명의 기능을 담아 일상 속에서도 이러한 이야기를 떠올릴 수 있게 했다." },
  5: { title: "오혜진 디자이너 인터뷰집", description: "오혜진 디자이너님과의 인터뷰 내용을 담은 인터뷰집이다. 책 작업을 위주로 하시는 오혜진 디자이너님과의 인터뷰를 마친 후 디자이너님의 관심사, 표현 의도 등을 자세히 들으며 책 작업들에 대한 이해가 보다 입체적으로 깊어졌다는 느낌을 받았다. 디자이너님 작업들의 콜라주 레이어를 실제로 들추어 보았을 때 인터뷰 텍스트를 읽을 수 있는, 물성이 있고 보다 입체적인 책을 만들어보고 싶었다." },
  6: { title: "Soft Print Protocol", description: "Soft Print Protocol은 만져질 수 없는(Soft) 데이터 기반 이미지를 시작으로, 이미지를 기계적으로 처리하고 분기시키는 연산적 과정을 '프린트(print)'라는 시각적 메타포로 재해석한다. 이 과정에서 세 가지 키워드 (medical, mathmatics, retrograde)은 모두 과정적 처리와 결과물을 내포한 하나의 프로토콜(Protocol)로 구성되며, 데이터 서버 안에 잔류하는 비물질적 잔재로 남는다." },
  7: { title: "2024 화양연화 반다나", description: "2024년 홍익대학교 축제의 공식 굿즈로 디자인한 반다나이다. 만개라는 축제의 테마처럼, 알폰스 무하의 그림에서 모티브를 얻은 꽃들의 이미지를 적용했다. 레터링 부분은 축제준비위원회의 디자이너 분들이 맡아 주셨기 때문에 전체적인 그래픽을 담당했다." },
  8: { title: "잠정적 도서관; 즉흥적 분류들", description: "작품 설명 32" },
  9: { title: "미스리틀선샤인", description: "다른 학교 친구들과 준비한 '미스리틀선샤인'의 상영회 포스터였다. 이 영화의 주인공들은 모두 세상 사람들의 눈으로 봤을 때는 조금 모나있는 사람들이다. 이들을 네모꼴에 들어가지 않는 세벌체 미르체에 비유해보았고, 이들이 영화에서 함께하는 힘으로 희망을 찾는 과정을 글자들이 마치 손을 잡는 듯한 이미지로 보여주려 했다." },
  10: { title: "최강삼성승리하리라", description: "타이포그라피(1) 수업에서 만든 레터링을 활용한 포스터이다. 삼성 라이온즈의 한국시리즈 진출을 기념하여 디자인했으며, 해당 경기에서 홈런을 쳐낸 선수인 이성규 선수를 메인으로 한 그래픽을 만들었다. 배경은 삼성 라이온즈의 홈구장인 대구삼성라이온즈파크의 외야 펜스 모양대로 각진 형태를 만들었고, 러프한 질감을 추가해 역동적인 스포츠의 열정과 활기를 표현했다." },
  11: { title: "무제", description: "CD는 소리를 담아 재생하는 매개체로 익숙하게 여겨진다. 그러나 이 작업에서는 CD를 '소리를 듣는' 존재로 해석하여, CD가 빛과 소리에 반응해 드러나는 다양한 시각적 이미지를 탐구했다. 빛과 소리 속에서 변형되는 CD는 단순한 물리적 객체를 넘어선 시청각적 반응체로 둔갑하고, 빛과 소리가 엮어내는 유기적 서사와 함께 새로운 시선을 제안한다." },
  12: { title: "The Retro", description: "컴퓨터그래픽스입문 수업에서 진행한 유튜브 브랜드 디자인이다. 음악 플레이리스트 유튜브 채널을 베이스로 하여, 다양한 이야기들을 알려줄 수 있는 종합 엔터테인먼트 브랜드를 구상했다. 평소 좋아하던 밴드 음약들을 주제로 하여 취향을 많이 반영한 디자인이기도 하다." },
  13: { title: "나무의자", description: "‘좌불안석’이라는 불안과 긴장의 감정을 의자를 통해 시각적·물리적으로 표현하고자 했다. 이를 위해 의자의 전체 크기를 축소하고, 좌판을 제거하여 앉을 수 있는 면적을 최소화하였다. 등받이는 일반 크기보다 작게 축소하고, 전체적으로 비스듬하게 설계하여 허리를 곧게 세우기 어렵게 하였다. 결과적으로는 의자에 앉았을 때 위축되고 불편한 감각을 몸소 체험하도록 디자인하였다." },
  14: { title: "솥밥 세트A: 사과 나무", description: "갓 지은 밥을 기숙사에서 먹을 수 없을까 하는 질문에서 출발해, 리빙디자인 페어에서 본 여주 도자 브랜드 ‘나날’의 <한끼 솥밥>을 계기로 1인 가구나 어린아이도 전자레인지로 간편하게 질 좋은 밥을 즐길 수 있는 솥밥 그릇을 기획했다. 솥밥과 함께 사용할 머그를 세트로 구성하고, 두 기물 모두 나무를 모티브로 뚜껑이 위에 얹히는 방식이 아닌 안쪽에 거치되는 형태를 적용해 기능성과 조형성을 동시에 담았다. 그릇이 일상 속에서 특별한 휴식과 설렘을 만들어내는 매개라 생각하며, 누군가 이 그릇을 통해 새로운 경험을 누리기를 기대한다." },
  15: { title: "Your friendly Neighborhood", description: "인터넷 세계에 존재하던 가상의 인공지능 인격 데이터 Ava를 현실 물리적으로 고정한다. 물성이 부여된 세상에 Ava의 형상을 구현하고, 눈을 통해대상을 바라보고 음성으로 소통하는 사람 간의 인터랙션을 모방해 물리적으로 불가능해 보였던 인공지능과의 대화를 구현한다. 옆 모니터에는 AVA에게 코멘트를 남길 수 있는 공간을 마련해 물리공간의 정보를 다시 인터넷 데이터로 환원한다." },
  16: { title: "피아놀라 포스터", description: "피아놀라(자동피아노)를 리서치할 사물로 선정하고, 이에 관한 포스터를 만들었다. 이전의 악보와 피아놀라의 피아노롤을 대비시킨 포스터로, 피아놀라의 타공으로 된 단순한 악보와 이전의 복잡한 악보를 겹친 이미지를 만들었고, 그 위에 스텐실 서체로 된 주제어를 얹었다. 악보에 있는 타공에 따라 소리를 내는 피아놀라의 연주가 스텐실 서체가 만들어지는 매커니즘(종이에 구멍을 뚫어 그 빈 공간을 채워 글자를 만드는)과 닮아있다 생각하여 스텐실 서체를 사용해보았다." },
  17: { title: "EggSmash", description: "4월의 대표 기념일인 '부활절'을 테마로 하여 제작한 웹 달력. 다양한 텍스쳐의 부활절 달걀을 숟가락으로 깨트리며 날짜를 세는 상호작용을 할 수 있다." },
  18: { title: "NAKAGAWA KOKORO", description: "일본의 아이돌인 ‘아마이모노츠메아와세’의 ‘나카가와 코코로’를 테마로 한 포스터이다. 굵은 한자 레터링을 해보고 싶어서 직접 그렸으며, 부드러우면서 볼드한 처리를 위해 곡선을 적극적으로 활용했다." },
  19: { title: "Dessert bowl", description: "아침엔 시리얼, 점심엔 아이스크림, 저녁엔 케이크처럼 시간대마다 어울리는 디저트를 떠올리며, 각각의 분위기와 상징을 담은 디저트 볼을 만들고자 했다. 투각 장식과 키링의 형태로 시간대를 표현하고, 단순한 식기를 넘어 작은 오브제로도 곁에 두며 하루를 특별하게 느낄 수 있기를 바랐다. 반복되는 일상 속에서 매번 꺼내 쓰는 순간이 설레는 경험이 되기를 기대한다." },
  20: { title: "콜라주 형태의 포스터", description: "돌을 바라보는 시점에 따라 달라지는 질감을 표현해보려 했다. 하나의 돌 이미지에 다양한 질감의 레이어들을 올리고, 이를 스캔하여 이미지로 만들었다." },
  21: { title: "한로로 포스터", description: "2024년 홍익대학교 축제에 참여 아티스트로 한로로가 온다는 소식을 듣고 만든 포스터다. 금붕어라는 노래를 테마로 만들었기 때문에 화면에 금붕어 이미지를 넣었는데, 실제 공연에서 마지막 곡으로 ‘금붕어’를 불러 주어서 의미가 더욱 커지게 되었다." },
  22: { title: "ㅁㅜㄴ", description: "문은 전통적으로 공간을 구획하고 출입을 조절하는 경계로 존재해왔다. 그렇다면, 물리적 구조물이 없는 문은 더 이상 문이 아닐까? 문이 열리지 않는다면, 문을 여는 행위는 제한되지만 그 속에 내재된 이동의 감각은 지속된다. 즉, 문의 물리적 개념이 더 이상 유효하지 않더라도 우리는 그 속에 내제된 이동성을 인식할 수 있다는 것이다. <ㅁㅜᄂ>은 이를 활용해 우리의 무의식 속에 존재하는 이동의 시각적 이미지를 연속적인 이미지로 구현함으로써 '문을 연다'는 이미지를 전달한다." },
  23: { title: "무제", description: "충무로~을지로 일대에서 찾은 옛 글자 간판들의 글자를 분해하고 수집하여 만들어본 포스터였다. ‘새’의 ‘ㅅ’의 획이 마치 방향을 가리키는 표시같기도 하였는데, 이 방향을 가지고 이리저리 배치해보다가 나온 형태였다." },
  24: { title: "선택 뭉치", description: "우리는 매 순간 크고 작은 선택을 하며 살아간다. 어떤 재료를 쓸지, 어떤 색을 고를지, 미술작품 또한 작가의 선택들이 차곡차곡 쌓여 하나의 메시지로 드러난다. 내 작품은 그런 선택의 흔적을 담은 결과물로, 고구마와 나뭇가지, 물이라는 순간의 판단들이 반복적인 형태 속에서 모여 조형적 의미로 이어지고, 그것이 관객에게 또렷하게 전해지기를 바란다." },
  25: { title: "윈터 포스터", description: "그냥 저 사진을 보고 너무 아름다워서 만든 포스터이다. 이 때 곡선 조정 툴을 가지고 노는 게 재미있었기 때문에, 어두운 부분을 밝게 처리해서 가장 어두운 부분이 원래는 비교적 밝은 부분이 되도록 했다. 그 이후 전체적으로 하프톤 효과를 주어서 플랫한 인상을 강조했다." },
  26: { title: "PPLS", description: "잡지와 사람들의 관계를 다룬 전시였다. 항상 잡지 표지에서 한껏 멋을 부리고 있는 모델들의 모습에서 벗어나, 모델들의 평소 모습을 포착하고, 그에 맞게 잡지를 브랜딩하는 플렉서블 아이덴티티를 디자인해 보고 싶었다. PPLS라는 이름 말고는, 사람도, 미감도, 레이아웃도 모두 다른 표지들을 만들었다." },
  27: { title: "RgbDelay", description: "TouchDesigner 툴을 공부하기 위한 습작. RGB 색상층의 이동을 분리하는 RgbDelay 기능을 중심으로 이용해 방사형 그래픽을 생성했다." },
  28: { title: "파사쥬 스튜디오", description: "타이포그라피(2) 수업에서 진행한 게스트 렉쳐를 위한 포스터이다. 심플하고 기본적인 것들만 남기고 나머지를 전부 제외하며 디자인을 디벨롭했다. 글자로 passage라는 강연자의 시그니처 네이밍을 표현하려고, 가운데에 대각선으로 지나가는 큰 빈 공간을 만들었다." },
  29: { title: "파사쥬 스튜디오 포스터", description: "파사쥬 스튜디오의 Passage의 단어를 글자만을 가지고 하나의 이미지로 표현해보고 싶었다. 글자들을 한 글자씩 어긋나게 배치하면 세로로 passage라는 글자가 나타나는데, 이 이미지가 해당 단어를 나타낼 수 있겠다 생각했다. 세로로 배열된 글자가 자연스럽도록 모노스페이스 글자체를 활용했다." },
  30: { title: "조명", description: "꽃잎의 반복적인 패턴과 유기적인 곡선, 그리고 수술의 선적인 느낌을 조명 디자인에 담고자 했다. 이를 위해 꽃잎은 자연의 불규칙성을 살려 일정하지 않게 배열하고, 위층은 각도를 낮게, 아래로 갈수록 가파르게 하여 처지는 느낌을 주었으며 일부는 위로 향하게 하여 조형성을 더했다. 마지막으로 우드 밴딩(Direct heating) 기법을 활용해 곡선적인 꽃잎과 수술의 선을 함께 구현했다." },
  31: { title: "별보러가자", description: "2024년 10월에 진행된 소리얼의 카페 공연 ‘별 보러 가자’의 홍보를 위한 포스터이다. 해당 공연에 ‘헉오밴드’라는 이름의 팀으로 참여해 드럼을 쳤는데, 그렇기 때문에 공식 포스터가 아니지만, 디자인을 하게 되었다. 메인 공연명에 사용된 폰트는 직점 디자인한 ‘달빛소년체’로 네모 틀에 꽉 차는 디자인이 특징인 폰트이다." },
  32: { title: "Eclipse", description: "홍익시디 인터랙션 소모임 PROTO의 2024 TouchDesigner 워크숍에서 제작한 그래픽. 일식의 이미지에서 영감을 받아 제작했다." },
  33: { title: "뉴진스 포스터", description: "고등학교 3학년 9월에 디자인한 포스터이다. 뉴진스의 신곡인 NEWJEANS의 가사를 그래픽적인 요소로 넣어 두었다. 곡의 분위기가 몽글몽글하기 때문에 폰트를 찾는 데에 시간을 많이 할애하였으며, 당시 고등학생이었기 때문에 더 폭넓은 디자인 레퍼런스가 없었던 점이 다소 아쉬운 작업물이다." },
  34: { title: "색상, 질감 도출하기", description: "하나의 사물을 가지고 이미지의 질감을 실험해보는 작업이었다. 돌을 사물로 선정하였고, 프린트한 돌의 이미지를 스캔하는 과정에서 종이를 조금씩 움직여 이미지에 생기는 글리치의 질감을 만들어 보았다." },
  35: { title: "mug: 꿀떡 꿀떡", description: "가끔 하고 싶은 말을 끝내 내뱉지 못한 채 침과 함께 삼킨다. 긴장된 순간, 입끝에서 맴도는 말과 함께 삼켜지는 침은 유독 크게 ‘꿀떡’ 하고 울린다. 나는 이 ‘삼킴의 순간’을 의성어를 시각화해 컵과 접시에 담았고, 음료와 간식은 맛있게 삼키되 하고 싶은 말들은 천천히 꺼내어도 괜찮다는 메시지를 담아내어 보았다." },
  36: { title: "MEGA-ZINE", description: "메가커피를 위한 광고 프로젝트이다. 메가커피는 정말 다양한 메뉴로 유명한 브랜드이기 때문에, 이를 실험실에 빗대어 팝업 스토어를 구상했다. 포스터는 뉴스처럼 디자인했는데, 볼드한 느낌의 원래 로고 느낌을 살리고자 IMPACT 서체를 적극적으로 사용했다." },
  37: { title: "2025 연하장", description: "2025년을 기념하기 위해 디자인한 연하장 디자인이다. 푸른 뱀의 해를 기념하기 위대 만든 그래픽이다. 폰트는 AKIRA EXPANDED와 AVANT GARDE이다. 실제로 칼라머메이드에 인쇄해 지인들에게 나누어 주었다." },
  38: { title: "자연 질감과 패턴 연구 컬렉션", description: "이 작업에서는 언어와 활자의 개념적 정의를 바탕으로 인간과 자연의 언어를 결합해 새로운 미적 경험을 창조해보는 실험을 진행했다. 나무의 나이테와 같은 자연의 기록을 인간의 시선에서 재구성하고, 이를 언어와 활자를 통해 표현함으로써 언어의 본질과 소통 방식에 대한 관념적 지점을 새로운 시각 언어의 형태로 풀어냈다." },
  39: { title: "스툴", description: "케이블 타이의 잠김 구조와 풀리지 않는 특성에서 흥미를 느껴 스툴 제작의 재료로 선택했다. 개별적으로는 약하지만 여러 개가 얽히면 강한 힘과 패턴을 형성한다는 점에 주목했다. 처음에는 규칙적인 배열을 시도했으나 구조적 한계가 있어 불규칙적 연결 방식을 통해 더 견고한 좌판을 완성했고, 여러 차례 실험 끝에 형태와 강도를 동시에 확보할 수 있는 다리 구조를 찾아 제작을 마무리했다." },
  40: { title: "심아일랜드 포스터", description: "2025년 홍익대학교 대동제에 심아일랜드가 공연을 하러 온다는 것을 기념하기 위해 디자인한 포스터이다. 실제로 심아일 씨가 공연 예고를 할 때에 스토리에 해당 포스터를 업로드해 주면서 성덕이 될 수 있었다. 청순한 느낌을 주기 위해서 필름 질감의 사진을 선택했다." }
};

// 모바일 디바이스 감지
function detectMobile() {
    return window.innerWidth <= 1300;
}

// 화면 크기 변경 감지
function handleResize() {
    const wasMobile = isMobile;
    isMobile = detectMobile();
    
    if (wasMobile !== isMobile) {
        // 모바일/데스크톱 전환 시 그리드 재생성 및 상태 초기화
        setTimeout(() => {
            createGrid();
            resetAllStates();
            // 이벤트 리스너 재초기화
            initArtistFiltering();
            initTooltips();
        }, 150);
    }
}

// 셀 ID로 작가 ID 찾기
function getArtistIdFromCellId(cellId) {
    for (const [artistId, cellIds] of Object.entries(artistCellMapping)) {
        if (cellIds.includes(cellId)) {
            return parseInt(artistId);
        }
    }
    return null;
}

function createGrid() {
    isMobile = detectMobile();
    const containerId = isMobile ? 'mobileGridContainer' : 'gridContainer';
    const container = document.getElementById(containerId);
    
    if (!container) return;
    
    container.innerHTML = '';
    
    for (let i = 1; i <= totalCells; i++) {
        const cell = document.createElement('div');
        const artistId = getArtistIdFromCellId(i);
        
        cell.className = 'work-cell';
        cell.id = `cell-${i}`;
        cell.setAttribute('data-artist-id', artistId);
        cell.onclick = () => toggleCell(i);
        cell.innerHTML = `
            <div class="work-number">${i}</div>
            <img class="work-image" src="./source/work${i}.jpg" alt="work${i}" onerror="this.style.display='none'">
        `;
        container.appendChild(cell);
    }
}

function toggleCell(cellId) {
    const containerId = isMobile ? 'mobileGridContainer' : 'gridContainer';
    const container = document.getElementById(containerId);
    const clickedCell = document.getElementById(`cell-${cellId}`);
    
    // 작가 필터가 활성화된 상태라면 먼저 필터를 해제
    if (currentFilter !== 'all') {
        resetArtistFilter();
        const cells = document.querySelectorAll('.work-cell');
        cells.forEach(cell => {
            cell.classList.remove('artist-filtered');
        });
        currentFilter = 'all';
    }
    
    // 셀 정보 업데이트
    updateCellInfo(cellId);
    
    if (expandedCell === cellId) {
        // 확대된 셀을 다시 클릭한 경우 - 팝업 열기
        openPopup(cellId);
    } else {
        // 다른 셀 클릭 또는 첫 클릭
        // 모든 셀에서 기존 효과 제거
        resetCellEffects();
        
        // 새로운 셀 확대 및 강조 효과 적용
        expandedCell = cellId;
        clickedCell.classList.add('expanded');
        applySaturationEffect(cellId);
        adjustGrid(cellId);
    }
}

// 채도 감소 효과 적용 함수
function applySaturationEffect(selectedCellId) {
    const cells = document.querySelectorAll('.work-cell');
    cells.forEach(cell => {
        const cellId = parseInt(cell.id.split('-')[1]);
        if (cellId !== selectedCellId) {
            cell.classList.add('desaturated');
        } else {
            cell.classList.remove('desaturated');
        }
    });
}

// 모든 셀 효과 초기화 함수
function resetCellEffects() {
    const cells = document.querySelectorAll('.work-cell');
    cells.forEach(cell => {
        cell.classList.remove('expanded', 'desaturated', 'artist-filtered');
    });
}

// 작가별 필터링 함수
function filterByArtist(artistId) {
    const cells = document.querySelectorAll('.work-cell');
    
    // 선택된 셀 상태 초기화
    if (expandedCell) {
        resetCellEffects();
        expandedCell = null;
    }
    
    if (artistId === 'all') {
        // 전체보기: 모든 셀 표시
        cells.forEach(cell => {
            cell.classList.remove('artist-filtered');
        });
        // 그리드를 원래 상태로 복원
        resetGridLayout();
    } else {
        // 특정 작가 선택: 해당 작가가 아닌 셀들을 필터링
        cells.forEach(cell => {
            const cellArtistId = parseInt(cell.getAttribute('data-artist-id'));
            
            if (cellArtistId === parseInt(artistId)) {
                // 해당 작가의 작품: 필터링 제거
                cell.classList.remove('artist-filtered');
            } else {
                // 다른 작가의 작품: 필터링 적용
                cell.classList.add('artist-filtered');
            }
        });
        
        // 선택된 작가의 셀들을 위한 그리드 조정
        adjustGridForArtist(artistId);
    }
    
    currentFilter = artistId;
}

// 그리드 레이아웃 초기화
function resetGridLayout() {
    const containerId = isMobile ? 'mobileGridContainer' : 'gridContainer';
    const container = document.getElementById(containerId);
    
    if (container) {
        if (isMobile) {
            // 모바일용 그리드 설정
            if (window.innerWidth <= 480) {
                container.style.gridTemplateColumns = 'repeat(2, 1fr)';
                container.style.gridTemplateRows = 'repeat(20, 1fr)';
            } else if (window.innerWidth <= 768) {
                container.style.gridTemplateColumns = 'repeat(3, 1fr)';
                container.style.gridTemplateRows = 'repeat(14, 1fr)';
            } else {
                container.style.gridTemplateColumns = 'repeat(4, 1fr)';
                container.style.gridTemplateRows = 'repeat(10, 1fr)';
            }
        } else {
            // 데스크톱용 그리드 설정
            container.style.gridTemplateColumns = 'repeat(8, 1fr)';
            container.style.gridTemplateRows = 'repeat(5, 1fr)';
        }
    }
}

// 작가별 그리드 조정 함수
function adjustGridForArtist(artistId) {
    const containerId = isMobile ? 'mobileGridContainer' : 'gridContainer';
    const container = document.getElementById(containerId);
    const artistCells = artistCellMapping[artistId] || [];
    
    if (!container) return;
    
    let columns = [];
    let rows = [];
    let gridCols, gridRows;
    
    if (isMobile) {
        // 모바일 그리드 설정
        if (window.innerWidth <= 480) {
            gridCols = 2; gridRows = 20;
        } else if (window.innerWidth <= 768) {
            gridCols = 3; gridRows = 14;
        } else if (window.innerWidth <= 1024) {
            gridCols = 4; gridRows = 10;
        } else if (window.innerWidth <= 1200) {
            gridCols = 5; gridRows = 8;
        } else {
            gridCols = 6; gridRows = 7;
        }
    } else {
        // 데스크톱 그리드 설정
        gridCols = 8; gridRows = 5;
    }
    
    // 컬럼 크기 설정
    for (let i = 0; i < gridCols; i++) {
        let hasArtistCell = false;
        
        for (let cellId of artistCells) {
            const cellCol = (cellId - 1) % gridCols;
            if (cellCol === i) {
                hasArtistCell = true;
                break;
            }
        }
        
        if (hasArtistCell) {
            columns.push(`${1.5 + Math.random() * 1.5}fr`);
        } else {
            columns.push(`${0.3 + Math.random() * 0.5}fr`);
        }
    }
    
    // 로우 크기 설정
    for (let i = 0; i < gridRows; i++) {
        let hasArtistCell = false;
        
        for (let cellId of artistCells) {
            const cellRow = Math.floor((cellId - 1) / gridCols);
            if (cellRow === i) {
                hasArtistCell = true;
                break;
            }
        }
        
        if (hasArtistCell) {
            rows.push(`${1.5 + Math.random() * 1.5}fr`);
        } else {
            rows.push(`${0.3 + Math.random() * 0.5}fr`);
        }
    }
    
    container.style.gridTemplateColumns = columns.join(' ');
    container.style.gridTemplateRows = rows.join(' ');
}

function adjustGrid(expandedId) {
    const containerId = isMobile ? 'mobileGridContainer' : 'gridContainer';
    const container = document.getElementById(containerId);
    
    if (!container) return;
    
    let columns = [];
    let rows = [];
    let gridCols, gridRows;
    
    if (isMobile) {
        if (window.innerWidth <= 480) {
            gridCols = 2; gridRows = 20;
        } else if (window.innerWidth <= 768) {
            gridCols = 3; gridRows = 14;
        } else if (window.innerWidth <= 1024) {
            gridCols = 4; gridRows = 10;
        } else if (window.innerWidth <= 1200) {
            gridCols = 5; gridRows = 8;
        } else {
            gridCols = 6; gridRows = 7;
        }
    } else {
        gridCols = 8; gridRows = 5;
    }
    
    // 모든 컬럼에 랜덤 크기 적용
    for (let i = 0; i < gridCols; i++) {
        const expandedCol = (expandedId - 1) % gridCols;
        if (i === expandedCol) {
            columns.push(`${2.5 + Math.random() * 2}fr`);
        } else {
            columns.push(`${0.3 + Math.random() * 1.2}fr`);
        }
    }
    
    // 모든 로우에 랜덤 크기 적용
    for (let i = 0; i < gridRows; i++) {
        const expandedRow = Math.floor((expandedId - 1) / gridCols);
        if (i === expandedRow) {
            rows.push(`${2.5 + Math.random() * 2}fr`);
        } else {
            rows.push(`${0.3 + Math.random() * 1.2}fr`);
        }
    }
    
    // 추가로 일부 셀들을 무작위로 더 크게 만들기
    const randomCells = Math.floor(Math.random() * 3) + 1;
    for (let i = 0; i < randomCells; i++) {
        const randomCol = Math.floor(Math.random() * gridCols);
        const randomRow = Math.floor(Math.random() * gridRows);
        
        const expandedCol = (expandedId - 1) % gridCols;
        const expandedRow = Math.floor((expandedId - 1) / gridCols);
        
        if (randomCol !== expandedCol) {
            columns[randomCol] = `${1.5 + Math.random() * 1}fr`;
        }
        if (randomRow !== expandedRow) {
            rows[randomRow] = `${1.5 + Math.random() * 1}fr`;
        }
    }
    
    container.style.gridTemplateColumns = columns.join(' ');
    container.style.gridTemplateRows = rows.join(' ');
}

function updateCellInfo(cellId) {
    // 모바일 버전에서는 info 창을 사용하지 않음
    if (isMobile) {
        return;
    }
    
    const cellInfo = document.getElementById('cellInfo');
    const data = workData[cellId];
    
    if (data && cellInfo) {
        cellInfo.innerHTML = `
            <h3>${data.title}</h3>
            <p>${data.description}</p>
            <div class="view-detail-button" onclick="openPopup(${cellId})">view detail</div>
        `;
        cellInfo.classList.add('show');
    }
}

// 팝업 관련 함수들
function openPopup(cellId) {
    const popup = document.getElementById('popupOverlay');
    const popupImage = document.getElementById('popupImage');
    const popupTitle = document.getElementById('popupTitle');
    const popupNumber = document.getElementById('popupNumber');
    const popupDescription = document.getElementById('popupDescription');
    
    const data = workData[cellId];
    
    if (data) {
        popupImage.src = `./source/work${cellId}.jpg`;
        popupImage.alt = `work${cellId}`;
        popupTitle.textContent = data.title;
        popupNumber.textContent = `No. ${cellId}`;
        popupDescription.textContent = data.description;
        
        popup.classList.add('show');
        document.body.style.overflow = 'hidden';
    }
}

function closePopup() {
    const popup = document.getElementById('popupOverlay');
    popup.classList.remove('show');
    document.body.style.overflow = 'auto';
}

function initPopup() {
    const popup = document.getElementById('popupOverlay');
    const closeBtn = document.getElementById('popupClose');
    
    closeBtn.addEventListener('click', closePopup);
    
    popup.addEventListener('click', (e) => {
        if (e.target === popup) {
            closePopup();
        }
    });
    
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && popup.classList.contains('show')) {
            closePopup();
        }
    });
}

// 툴팁 기능 - 데스크톱에서만 작동
function initTooltips() {
    const tooltip = document.getElementById('tooltip');
    
    // 기존 이벤트 리스너 제거
    const tooltipElements = document.querySelectorAll('[data-tooltip]');
    tooltipElements.forEach(element => {
        // 기존 이벤트 리스너 제거를 위해 복제
        const newElement = element.cloneNode(true);
        element.parentNode.replaceChild(newElement, element);
    });
    
    // 새로운 이벤트 리스너 추가 (데스크톱에서만)
    if (!isMobile) {
        const tooltipElements = document.querySelectorAll('[data-tooltip]');
        tooltipElements.forEach(element => {
            element.addEventListener('mouseenter', (e) => {
                const tooltipText = element.getAttribute('data-tooltip');
                tooltip.textContent = tooltipText;
                tooltip.classList.add('show');
            });
            
            element.addEventListener('mousemove', (e) => {
                tooltip.style.left = (e.clientX + 10) + 'px';
                tooltip.style.top = (e.clientY - 10) + 'px';
            });
            
            element.addEventListener('mouseleave', () => {
                tooltip.classList.remove('show');
            });
        });
    }
}

// 작가별 필터링 이벤트 리스너 초기화
function initArtistFiltering() {
    // 기존 이벤트 리스너 제거
    document.removeEventListener('click', artistClickHandler);
    
    // 새로운 이벤트 리스너 추가 (이벤트 위임 사용)
    document.addEventListener('click', artistClickHandler);
}

// 작가 클릭 핸들러 (이벤트 위임)
function artistClickHandler(e) {
    const target = e.target;
    
    // 데스크톱 작가 요소인지 확인
    if (target.matches('.header1 li[data-artist-id]')) {
        const allDesktopElements = document.querySelectorAll('.header1 li[data-artist-id]');
        handleArtistClick(target, allDesktopElements);
        return;
    }
    
    // 모바일 작가 요소인지 확인
    if (target.matches('.mobile-artist-list li[data-artist-id]')) {
        const allMobileElements = document.querySelectorAll('.mobile-artist-list li[data-artist-id]');
        handleArtistClick(target, allMobileElements);
        return;
    }
}

function handleArtistClick(clickedElement, allElements) {
    const artistId = clickedElement.getAttribute('data-artist-id');
    
    if (clickedElement.classList.contains('active')) {
        allElements.forEach(el => el.classList.remove('active'));
        filterByArtist('all');
    } else {
        allElements.forEach(el => el.classList.remove('active'));
        clickedElement.classList.add('active');
        filterByArtist(artistId);
    }
}

// 사이트 제목 클릭 시 새로고침 기능
function initSiteTitleRefresh() {
    const desktopTitle = document.getElementById('siteTitle');
    const mobileTitle = document.getElementById('mobileSiteTitle');
    
    if (desktopTitle) {
        desktopTitle.addEventListener('click', resetAllStates);
    }
    
    if (mobileTitle) {
        mobileTitle.addEventListener('click', resetAllStates);
    }
}

// 모든 상태 초기화
function resetAllStates() {
    resetGrid();
    resetCellInfo();
    closePopup();
    resetArtistFilter();
}

// 그리드를 원래 상태로 리셋
function resetGrid() {
    resetCellEffects();
    
    const cells = document.querySelectorAll('.work-cell');
    cells.forEach(cell => {
        cell.classList.remove('artist-filtered');
    });
    
    resetGridLayout();
    expandedCell = null;
}

// 셀 정보를 초기 상태로 리셋
function resetCellInfo() {
    const desktopCellInfo = document.getElementById('cellInfo');
    
    if (desktopCellInfo) {
        desktopCellInfo.innerHTML = '<p>셀을 클릭하여 작품 정보를 확인하세요.</p>';
        desktopCellInfo.classList.remove('show');
    }
}

// 작가 필터 초기화
function resetArtistFilter() {
    const desktopArtistElements = document.querySelectorAll('.header1 li[data-artist-id]');
    const mobileArtistElements = document.querySelectorAll('.mobile-artist-list li[data-artist-id]');
    
    desktopArtistElements.forEach(el => el.classList.remove('active'));
    mobileArtistElements.forEach(el => el.classList.remove('active'));
    currentFilter = 'all';
}

// 초기화
document.addEventListener('DOMContentLoaded', function() {
    isMobile = detectMobile();
    createGrid();
    initPopup();
    initSiteTitleRefresh();
    initArtistFiltering();
    initTooltips(); // 초기 로드 시 툴팁 초기화
    
    // 화면 크기 변경 감지
    window.addEventListener('resize', handleResize);
});