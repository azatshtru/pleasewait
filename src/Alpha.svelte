<script>
    import Prompt from "./lib/Prompt.svelte";

    let textAreaRef;
    let setButtonState;

    const headline = "Immutability without authority";
    let text = headline;

    const fixingSpeed = 35;
    
    let typing;
    let areaDisabled;

    function setDynamicHeight () {
        textAreaRef.style.height = 'auto';
        textAreaRef.style.height = textAreaRef.scrollHeight + 'px';
    }

    function checkAndReplace (message, i) {
        if(message[i] != text[i]){
            text = text.substring(0, i) + message[i] + text.substring(i+1);
        }
        setDynamicHeight();
    }

    function emptyRemainingText () {
        text = text.substring(0, text.length - 1) + "";
        setDynamicHeight();
    }

    function resetHeadlineString () {
        for(let i = 0; i < headline.length; i++){
            setTimeout(() => checkAndReplace(headline, i), i*fixingSpeed);
        }

        if(headline.length == text.length){ return; }

        const t = text.length;

        for(let i = headline.length; i < t; i++){
            setTimeout(() => emptyRemainingText(), i * fixingSpeed);
        }
    }

    function showDynamicMessage (message, resetTime) {
        disableTextArea();

        for(let i = 0; i < message.length; i++){
            setTimeout(() => checkAndReplace(message, i), i*fixingSpeed);
        }

        if(message.length == text.length){ return; }

        const t = text.length;

        for(let i = message.length; i < t; i++){
            setTimeout(() => emptyRemainingText(), i * fixingSpeed);
        }

        setTimeout(handleChange, t * fixingSpeed + resetTime);
    }

    function disableTextArea () {
        textAreaRef.disabled = true;
        setButtonState(false);
        
        const t = text.length;
        areaDisabled = setTimeout(() => {textAreaRef.disabled = false; setButtonState(true);}, t * fixingSpeed);
    }

    function resetText() {
        clearTimeout(areaDisabled);

        disableTextArea();

        if(text !== headline){
            resetHeadlineString();
        }
    }
    
    function handleChange (e) {

        setDynamicHeight();

        clearTimeout(typing);

        typing = setTimeout(resetText, 2000);
    }

</script>

<div class="container">
    <textarea bind:this={textAreaRef} bind:value={text} on:input={handleChange} class="moment"></textarea>
    <div class="emailBox">
        <Prompt sendMessage={(m, t) => showDynamicMessage(m, t)} bind:toggleButton={setButtonState} />
    </div>
</div>

<style>
    @import url('https://fonts.googleapis.com/css2?family=DM+Serif+Display&display=swap');

    .container {
        display: flex;
        justify-content: center;
        align-items: center;

        width: 100%;
        height: 100%;
        position: fixed;

        flex-direction: column;
        gap: 3.5em;
    }

    .moment {
        width: 60%;
        line-height: 0.9;

        overflow: hidden;
        
        padding: 1.2%;
        margin: 0%;

        background-color: black;
        transform: translateZ(20px);

        font-family: 'DM Serif Display', serif;
        color: whitesmoke;
        font-size: 5rem;

        resize: none;
        min-height: 250px;
    }

    .moment:focus {
        outline: none;
    }

    @media only screen and (max-width: 768px) {
        .moment {
            min-height: 300px;
            width: 90%;
            top: 20%;
            left: 3%;
            font-size: 4em;

            word-break: normal;
        }
    }

    @media only screen and (max-width: 600px) {
        .moment {
            min-height: 300px;
            width: 90%;
            top: 20%;
            left: 3%;
            font-size: 3em;

            word-break: normal;
        }
    }
</style>