(function(){
    var repoName = "";
    var userName;
    $(document).ready(function () {
        $('.get-repos').on('click', getRepos);
        $('.repo-list').on('click', '.card-link', openIssueModal)
        $('.create-issue').on('click', submitIssue)
    })
    
    function getRepos(event) {
        userName = $('#username').val();
        $.get('https://api.github.com/users/'+userName+'/repos')
            .done(function(data) {
                var template = '';
                template += data.map(function(repo){
                    return '<li class="list-group-item">'+
                            repo.name + '<a href="#" class="card-link" data-reponame="'+repo.name+'"> create issue </a></li>'
                }).join('')
    
                $('.repo-list').html(template);
            })
            .fail(function(error) {
                $('.repo-list').html('<li class="list-group-item list-group-item-danger">Some thing went wrong try again</li>');
            })
    }
    
    function openIssueModal(event){
        event.preventDefault();
        repoName = $(event.target).data('reponame');
        $('#formIssueModal').modal('show');
    }
    
    function submitIssue(event){

        var parameters = {};

        if($('#title').val()){
            parameters.title = $('#title').val().trim();
        }
        if(!$('#password').val()){
            $('#password').closest('.col-md-6').find('.invalid-tooltip').show();
            return;
        }
        else {
            $('#password').closest('.col-md-6').find('.invalid-tooltip').hide();
        }
        if($('#body').val()){
            parameters.body = $('#body').val().trim();
        }
        if($('#assignees').val()){
            parameters.assignees = $('#assignees').val().split(',').map(function(s){return s.trim()});
        }
        if($('#milestone').val()){
            parameters.milestone = Number($('#milestone').val().trim());
        }
        if($('#labels').val()){
            parameters.labels = $('#labels').val().split(',').map(function(s){return s.trim()});
        }
    
        $.ajax({
            url: 'https://api.github.com/repos/'+ userName +'/'+ repoName +'/issues',
            headers: {
                'Accept': 'application/vnd.github.symmetra-preview+json'
            },
            type:"post",
            data: JSON.stringify(parameters),
            dataType: 'json',
            beforeSend: function (xhr) {
                xhr.setRequestHeader ("Authorization", "Basic " + btoa(userName + ":" + $('#password').val()));
            }
        })
        .done(function(data){
            $('.alert-message').text("successfully created issue Issue number "+ data.responseJSON.number);
            $('.alert-message').removeClass('alert-danger').addClass('alert-success').fadeIn();
            setTimeout(function(){
                $('.alert-message').fadeOut();
            },3000)
        })
        .fail(function(error){
            console.log(error.responseJSON)
            $('.alert-message').text(error.responseJSON.message);
            $('.alert-message').removeClass('alert-success').addClass('alert-danger').fadeIn();
            setTimeout(function(){
                $('.alert-message').fadeOut();
            },3000)
        })
    }
})()
