//create element wrapper and social nav

$(document).ready(function() {
    var section = $('<section>', { class: 'blog-item-share-wrapper' });
    var nav = $('<nav>', { class: 'share-list' });
    
    section.append(nav);
    
    $('.blog-item-title').append(section);
});
