$(function () {
    // Select the content inside the .blog-item-content .e-content class
    var txt = $(".blog-item-content")[0].textContent;
    
    // Calculate the word count
    var wordCount = txt.replace(/[^\w ]/g, "").split(/\s+/).length;
    
    // Calculate the reading time in minutes
    var readingTimeInMinutes = Math.floor(wordCount / 228) + 1;
    var readingTimeAsString = readingTimeInMinutes + " minutes";
    
    // Append reading time information to the .blog-item-title class
    $('.blog-item-share-wrapper').append(`
      
      <div class="reading-time"></div>
      
      `);
    $('.reading-time').html(wordCount + " words — " + readingTimeAsString);
});

