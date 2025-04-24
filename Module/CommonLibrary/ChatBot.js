var chatScript = [];
var currentChatObject = null;
function showChatBot() {
    $('#divChatBot').show();
}
function hideChatBot() {
    $('#divChatBot').hide();
}
function resetChatLog() {
    if (confirm('Are you sure you want to reset the chat log?')) {
        chatScript = [];
        currentChatObject = null;
        $('#chatConversation .chatOptionGroup .chatOption').off();
        $('#chatConversation').html('<i class="startChatLine">Type "Hi" to start the bot chat coversation</i>');
    }
}
function addToChatLog() {

}
function showQuestionAndOptions() {

    var getQuestion = currentChatObject.question;
    var getQuestionType = currentChatObject.questionType;

    $('#chatConversation').append('<div class="chatQuestionHolder"><div class="chatQuestion">' + getQuestion + '</div></div>');
    if (getQuestionType == 'options') {
        var getOptions = currentChatObject.options;
        if (getOptions.length > 0) {
            var collectOptions = '';
            for (var i = 0; i < getOptions.length; i++) {
                var currentOption = getOptions[i].option;
                collectOptions = collectOptions + '<div class="chatOption" data-optindex="' + i + '">' + currentOption + '</div>';
            }
            $('#chatConversation').append('<div class="chatOptionGroup">' + collectOptions + '</div>');
        }
        $('#chatConversation .chatOptionGroup .chatOption').off();
        $('#chatConversation .chatOptionGroup .chatOption').click(function () {
            var getOptionIndex = Number($(this).attr('data-optindex'));
            selectChatOption = $(this).html();
            $('#chatConversation').append('<div class="chatUserMsgHolder"><div class="chatUserMsg">' + selectChatOption + '</div></div>');
            $('#chatConversation .chatOptionGroup').remove();
            currentChatObject = currentChatObject.options[getOptionIndex].reply[0];
            showQuestionAndOptions();
        });
    } else if (getQuestionType == 'userinput') {

    } else if (getQuestionType == 'information') {
        $('#chatConversation').append('<div class="chatQuestionHolder"><div class="chatQuestion">Do you want to close the chat?</div></div>');
        var collectOptions = '<div class="chatOption" data-optindex="0">Yes</div>';
        collectOptions = collectOptions + '<div class="chatOption" data-optindex="1">No</div>';
        $('#chatConversation').append('<div class="chatOptionGroup">' + collectOptions + '</div>');
        $('#chatConversation .chatOptionGroup .chatOption').off();
        $('#chatConversation .chatOptionGroup .chatOption').click(function () {
            var getOption = $(this).html().trim().toLowerCase();
            if (getOption == 'yes') {
                alert('You pressed: Yes');
                resetChatLog();
                hideChatBot();
            } else {
                alert('You pressed: No');
                $('#chatConversation').append('<div class="chatUserMsgHolder"><div class="chatUserMsg">No</div></div>');
                $('#chatConversation .chatOptionGroup').remove();
            }
        });

    }
    $('#chatBoxInput').val('');
    var objDiv = document.getElementById("chatConversationHolder");
    objDiv.scrollTop = objDiv.scrollHeight;
}

function sendChatMessage() {
    var getInput = $('#chatBoxInput').val();
    if (currentChatObject == null && getInput.trim().toLowerCase() == 'hi') {
        $('.startChatLine').hide();
        loadChatScript();
        currentChatObject = chatScript[0];
        showQuestionAndOptions();
    } else {
        showQuestionAndOptions();
    }
}

function loadChatScript() {
    chatScript = [{
        question: "Hi I am GwcOmsChatBot. How can I help you today",
        questionType: "options",
        options: [
            {
                option:"Dashboard"
            },
            {
                option: "Setup"
            },
            {
                option: "Request",
                reply: [{
                    question: "Select your options from below",
                    questionType: "options",
                    options: [
                        {
                            option: "How to create new request?",
                            reply: [{
                                question: "1. Click to three bar on top <br />2. Select Request menu from navigation <br />3. Click to Add New button <br />4. Fill the order form<br />5. Add SKU to SKU list<br /> 6.Click to Save button to save order.",
                                questionType: "information"                                
                            }]
                        },
                        {
                            option: "Know your order status",
                            reply: [{
                                question: "Enter your order number",
                                questionType: "userinput",
                                callAPI:"orderstatus"
                            }]
                        }
                    ]
                }]
            },
            {
                option: "Approval"
            },
            {
                option: "Dispatch"
            },
            {
                option: "Report"
            },
            {
                option: "Return Order"
            },
            {
                option: "Import"
            }
        ]
    },


    ];
}