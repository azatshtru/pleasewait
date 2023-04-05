<script>
    import { onMount } from "svelte";
    import { addEmail, valueObjectSubscriberList } from "../setup";

    export let sendMessage;

    let active = false;
    let typing = false;

    export let isFocused = false;

    let emailFieldRef;

    let promptText;

    let messageTimeout;

    const setValues = (valueObject) => {
        invalidEmailMessage = valueObject.invalidAddress;
        emailSubmittedMessage = valueObject.emailSubmitted;
        subheading0 = valueObject.subheading0;
        subheading1 = valueObject.subheading1;
    }

    onMount(() => {valueObjectSubscriberList.push(setValues)})

    let invalidEmailMessage = "That doesn't seem like a valid email address :(";
    let emailSubmittedMessage = "Thank you! <3 We are excited to show you the future. You'll recieve an email as soon as we're done building it. ";
    let subheading0 = "we are building a future where you own and control your";
    let subheading1 = "data and money";

    const verifyEmail = email => {
	    return /^([^\x00-\x20\x22\x28\x29\x2c\x2e\x3a-\x3c\x3e\x40\x5b-\x5d\x7f-\xff]+|\x22([^\x0d\x22\x5c\x80-\xff]|\x5c[\x00-\x7f])*\x22)(\x2e([^\x00-\x20\x22\x28\x29\x2c\x2e\x3a-\x3c\x3e\x40\x5b-\x5d\x7f-\xff]+|\x22([^\x0d\x22\x5c\x80-\xff]|\x5c[\x00-\x7f])*\x22))*\x40([^\x00-\x20\x22\x28\x29\x2c\x2e\x3a-\x3c\x3e\x40\x5b-\x5d\x7f-\xff]+|\x5b([^\x0d\x5b-\x5d\x80-\xff]|\x5c[\x00-\x7f])*\x5d)(\x2e([^\x00-\x20\x22\x28\x29\x2c\x2e\x3a-\x3c\x3e\x40\x5b-\x5d\x7f-\xff]+|\x5b([^\x0d\x5b-\x5d\x80-\xff]|\x5c[\x00-\x7f])*\x5d))*(\.\w{2,})+$/.test(email);
    };

    function promptSubmit () {
        if(messageTimeout){return;}
        if(promptText.trim() == ""){ return; }
        if(!verifyEmail(promptText)){
            sendMessage(invalidEmailMessage, 3000);
            messageTimeout = setTimeout(() => {messageTimeout = null;}, invalidEmailMessage.length * 25);
            return;
        }

        addEmail(promptText);
        promptText = "";

        sendMessage(emailSubmittedMessage, 20000);
        messageTimeout = setTimeout(() => {messageTimeout = null}, emailSubmittedMessage.length * 25);
    }

    function onKeyDown(e){
        switch(e.key){
            case "Enter":
                if(typing == true){
                    active = true;
                }
                promptSubmit();
                break;
        }
    }

    function onKeyUp(e){
        switch(e.key){
            case "Enter":
                active = false;
                break;
        }
    }

</script>

<p class="text">{subheading0} <span style="color:blueviolet; font-weight: bold">{subheading1}</span></p>
<br>
<div class="textbox">
    <input bind:this={emailFieldRef} bind:value={promptText} class="field" on:focusout={() => {typing=false;}} on:focus={() => {typing=true; isFocused=true;}} on:blur={() => isFocused=false} placeholder="type your email..">
    <button class="send" on:click={promptSubmit} class:active={active}>subscribe</button>
</div>

<svelte:window on:keyup={onKeyUp} on:keydown={onKeyDown} />

<style>
    @import url('https://fonts.googleapis.com/css2?family=Azeret+Mono:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap');

    .text {
        color: black;
        text-align: left;
        padding-left: 10px;
        margin-block: 0px;
        padding-block: 0;
        line-height: 1.3em;
        font-family: 'Azeret Mono', monospace;
        font-size: 1em;
    }

    .textbox {
        display: flex; 
        flex-direction: row;
        justify-content: flex-start;
        align-items: center;

        width: 100%;
        gap: 5px;
    }

    .field {
        height: 30px;
        margin-left: 10px;
        margin-top: .8em;
        margin-bottom: 10px;
        background-color: whitesmoke;
        border: 2px solid black;
        font-family: 'Azeret Mono', monospace;
        color: black;

        flex: 3 1 auto;
    }

    .field:focus {
        outline: none;
        cursor: text;
        color: black;
    }

    .send {
        height: fit-content;
        width: fit-content;
        
        background-color: rgb(199, 114, 255);
        border: 2px solid black;

        border-radius: 3px;
        padding-block: 4px;
        margin-right: 5px;

        font-family: 'Space Mono', monospace;
        color: black;

        box-shadow: 3px 3px black;
        position: relative;
        top: -2px;

        flex: 0 1 auto;
    }

    .send:hover{
        border: 2px solid black;
    }

    .send:active, .active {
        box-shadow: none;
        position: relative;
        top: 3px;
        left: 3px;
    }
    
    .send:focus, .send:focus-visible {
        outline: none;
    }

</style>