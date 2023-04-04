<script>
    import { onMount } from "svelte";
    import Prompt from "./lib/Prompt.svelte";
    import { valueObjectSubscriberList } from "./setup";

    let textAreaRef;
    
    onMount(() => {valueObjectSubscriberList.push((v) => {headline = v.headline; text = headline})});

    let headline = "Immutability without authority";
    let text = headline;

    const fixingSpeed = 25;
    
    let typing;
    let areaDisabled;

    let fixing;
    let fixingTimeout;

    let messageTimeout;

    function setDynamicTextAreaHeight () {
        if(!textAreaRef) {return}
        textAreaRef.style.height = 'auto';
        textAreaRef.style.height = textAreaRef.scrollHeight + 'px';
    }

    function checkAndReplace (message, i) {
        if(message[i] != text[i]){
            text = text.substring(0, i) + message[i] + text.substring(i+1);
        }
        setDynamicTextAreaHeight();
    }

    function emptyRemainingText () {
        text = text.substring(0, text.length - 1) + "";
        setDynamicTextAreaHeight();
    }

    function resetHeadlineString () {
        if(fixing){
            return;
        }
        
        fixing = true;

        const t = text.length;

        fixingTimeout = setTimeout(() => fixing = false, t * fixingSpeed);

        for(let i = 0; i < headline.length; i++){
            setTimeout(() => checkAndReplace(headline, i), i*fixingSpeed);
        }

        if(headline.length == text.length){ return; }

        for(let i = headline.length; i < t; i++){
            setTimeout(() => emptyRemainingText(), i * fixingSpeed);
        }
    }

    function showDynamicMessage (message, resetTime) {
        if(fixing){
            return;
        }

        if(text == message){
            return;
        }

        disableTextArea();

        const t = text.length;

        fixing = true;
        fixingTimeout = setTimeout(() => fixing = false, t * fixingSpeed);
        
        clearTimeout(typing);
        typing = setTimeout(resetText, (t * fixingSpeed) + resetTime);

        for(let i = 0; i < message.length; i++){
            setTimeout(() => checkAndReplace(message, i), i*fixingSpeed);
        }

        if(message.length == text.length){ return; }

        for(let i = message.length; i < t; i++){
            setTimeout(() => emptyRemainingText(), i * fixingSpeed);
        }

    }

    function disableTextArea () {
        textAreaRef.disabled = true;
        
        const t = text.length;
        areaDisabled = setTimeout(() => {textAreaRef.disabled = false;}, t * fixingSpeed);
    }

    function resetText() {
        clearTimeout(areaDisabled);

        disableTextArea();

        if(text !== headline){
            resetHeadlineString();
        }
    }
    
    function handleChange (e) {

        setDynamicTextAreaHeight();

        clearTimeout(typing);

        typing = setTimeout(resetText, 3000);
    }

</script>

<div class="container">
    <textarea bind:this={textAreaRef} bind:value={text} on:input={handleChange} class="moment"></textarea>
    <div class="emailBox">
        <Prompt sendMessage={(m, t) => showDynamicMessage(m, t)} />
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