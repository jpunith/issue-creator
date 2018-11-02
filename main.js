(function(){
    var repoName = "";
    var userName;
    $(document).ready(() => {
        $('.get-repos').on('click', getRepos);
        // $('.repo-list').on('click', '.card-link', openIssueModal)
        // $('.create-issue').on('click', submitIssue)
    })
    
    function getRepos(event) {
        userName = $('#username').val();
        $.get('https://api.github.com/users/'+userName+'/repos')
            .done((data) => {
                let template = '';
                template += data.map(function(repo){
                    return `<li class="list-group-item">
                            ${repo.name} <a href="https://github.com/${userName}/${repo.name}/issues/new" class="card-link" > New Issue </a></li>`;
                }).join('')
    
                $('.repo-list').html(template);
            })
            .fail((error) => {
                if(error.state() === 'rejected'){
                    $('.repo-list').html('<li class="list-group-item list-group-item-danger">Request rejected</li>');
                }
                setTimeout(function(){
                    $('.repo-list').html('');
                },3000)
            })
    }
    
    // function openIssueModal(event){
    //     event.preventDefault();
    //     repoName = $(event.target).data('reponame');
    //     $('#formIssueModal').modal('show');
    // }
    
    // function submitIssue(event){

    //     var parameters = {};

    //     if($('#title').val()){
    //         parameters.title = $('#title').val().trim();
    //     }
    //     if(!$('#password').val()){
    //         alertErrorMessage("Please enter the password");
    //         $('#password').closest('.col-md-6').find('.invalid-tooltip').show();
    //         return;
    //     }
    //     if($('#body').val()){
    //         parameters.body = $('#body').val().trim();
    //     }
    //     if($('#assignees').val()){
    //         parameters.assignees = $('#assignees').val().split(',').map(function(s){return s.trim()});
    //     }
    //     if($('#milestone').val()){
    //         parameters.milestone = Number($('#milestone').val().trim());
    //     }
    //     if($('#labels').val()){
    //         parameters.labels = $('#labels').val().split(',').map(function(s){return s.trim()});
    //     }
    
    //     $.ajax({
    //         url: 'https://api.github.com/repos/'+ userName +'/'+ repoName +'/issues',
    //         headers: {
    //             'Accept': 'application/vnd.github.symmetra-preview+json'
    //         },
    //         type:"post",
    //         data: JSON.stringify(parameters),
    //         dataType: 'json',
    //         beforeSend: function (xhr) {
    //             xhr.setRequestHeader ("Authorization", "Basic " + btoa(userName + ":" + $('#password').val()));
    //         }
    //     })
    //     .done(function(data){
    //         alertSuccessMessage("successfully created issue Issue number "+ data.number);
    //     })
    //     .fail(function(error){
    //         alertErrorMessage(error.responseJSON.message);
    //     })
    // }

    function alertSuccessMessage(msg){
        $('.alert-message').text(msg);
        $('.alert-message').removeClass('alert-danger').addClass('alert-success').fadeIn();
        setTimeout(function(){
            $('.alert-message').fadeOut();
        },3000)
    }

    function alertErrorMessage(msg){
        $('.alert-message').text(msg);
        $('.alert-message').removeClass('alert-success').addClass('alert-danger').fadeIn();
        setTimeout(function(){
            $('.alert-message').fadeOut();
        },3000)
    }
})()
