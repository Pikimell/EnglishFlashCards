const learnModule1 = localStorage.getItem('learnModule1');
const learnModule2 = localStorage.getItem('learnModule2');
const learnedWords = localStorage.getItem('learnedWords');
const savedWords = localStorage.getItem('savedWords');

if(!learnModule1){
    localStorage.setItem('learnModule1', '[{"id":"awdawd", "title": "test", "words":[{"eng":"test", "rus":"test"}]}]');  //TODO
}

if(!learnModule2){
    localStorage.setItem('learnModule2', '[]');
}

if(!learnedWords){
    localStorage.setItem('learnedWords', '[]');
}

if(!savedWords){
    localStorage.setItem('savedWords', '[]');
}

