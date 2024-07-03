$(document).ready(function () {
    // Get the script tag and its data-disable-functions attribute
    var scriptTag = $('script[src*="headlightreview-blog-custom.js"]');
    var disabledFunctions = scriptTag.data('disable-functions');
    var disabledFunctionsArray = disabledFunctions ? disabledFunctions.split(',') : [];
  
    function isFunctionDisabled(functionName) {
      return disabledFunctionsArray.includes(functionName);
    }
  
    // Higher-order function to manage execution
    function executeFunction(name, fn) {
      if (!isFunctionDisabled(name)) {
        fn();
      }
    }
  
    // Define all functions
    const functions = {
      wrapBlogTitle: function () {
        $(".blog-item-title").wrap(
          '<div class="blog-item-title-wrapper row sqs-row"></div>'
        );
      },
      addClassesToTitle: function () {
        $(".blog-item-title").addClass("col sqs-col-8 span-8");
      },
      moveAuthorToAside: function () {
        $(".blog-item-author-profile-wrapper").appendTo("#asideAuthor");
      },
      processAuthorNames: function () {
        $(".author-name").each(function () {
          var content = $(this).html();
          var processedContent = splitAndWrapContent(content);
          $(this).html(processedContent);
        });
  
        function splitAndWrapContent(content) {
          var delimiterRegex = /[–—|]/; // Regex to match en dash, em dash, or pipe
  
          if (delimiterRegex.test(content)) {
            var parts = content.split(delimiterRegex);
            var beforeDelimiter = parts[0].trim();
            var afterDelimiter = parts[1].trim();
  
            return (
              beforeDelimiter +
              '<br><span class="author-name-title">' +
              afterDelimiter +
              "</span>"
            );
          }
          return content; // Return original content if no delimiter is found
        }
      },
      handleImages: function () {
        function createImageElement(imageUrl) {
          const imageElement = $("<img>")
            .addClass("blog-item-image")
            .attr("src", imageUrl);
          return imageElement;
        }
  
        function placeImageElement(imageElement, targetSelector) {
          const targetElement = $(targetSelector);
  
          if (targetElement.length > 0) {
            targetElement.append(imageElement);
          }
        }
  
        const imageMeta = $('meta[itemprop="image"]');
        const imageUrl = imageMeta.length > 0 ? imageMeta.attr("content") : "";
  
        if (imageUrl) {
          const imageElement = createImageElement(imageUrl);
          placeImageElement(imageElement, ".blog-item-title-wrapper");
        }
  
        $(".blog-item-image").wrap(
          '<div class="blog-item-image-wrapper col sqs-col-4 span-4"></div>'
        );
      },
      moveAuthorDateWrapper: function () {
        var wrapper = $(".blog-item-author-date-wrapper");
        var targetElement = $(".blog-item-title").children().first();
  
        if (wrapper.length > 0 && targetElement.length > 0) {
          wrapper.detach();
          targetElement.after(wrapper);
        }
  
        var authorWrapper = $(".blog-meta-item--author");
        var currentText = authorWrapper.text();
        var newText = currentText.replace("Written By", "");
        authorWrapper.text(newText);
      },
      addLineBreaksToPoem: function () {
        $(".poem-line").each(function () {
          $(this).after("<br>");
        });
      },
      formatDatePublished: function () {
        var datePublishedMetaTag = $('meta[itemprop="datePublished"]');
        if (datePublishedMetaTag.length > 0) {
          var datePublished = new Date(datePublishedMetaTag.attr("content"));
          var timeElement = $(".dt-published.blog-meta-item.blog-meta-item--date");
          if (timeElement.length > 0) {
            var options = { month: "long", day: "numeric", year: "numeric" };
            var formattedDateWithYear = datePublished.toLocaleDateString("en-US", options);
            timeElement.html(addOrdinalSuffix(formattedDateWithYear));
          }
        }
  
        function addOrdinalSuffix(dateString) {
          var dayNumber = parseInt(dateString.match(/\d+/)[0]);
          var suffix = getOrdinalSuffix(dayNumber);
          return dateString.replace(/\d+/, dayNumber + suffix);
        }
  
        function getOrdinalSuffix(day) {
          if (day > 3 && day < 21) return "th";
          switch (day % 10) {
            case 1:
              return "st";
            case 2:
              return "nd";
            case 3:
              return "rd";
            default:
              return "th";
          }
        }
      },
      createProgressBar: function () {
        var progressBarContainer = $("<div>", { id: "reading-progress-container" });
        var progressBar = $("<div>", { id: "reading-progress-bar" });
        progressBarContainer.append(progressBar);
        $(".header-border").append(progressBarContainer);
  
        function debounce(func, wait) {
          var timeout;
          return function () {
            var context = this,
              args = arguments;
            clearTimeout(timeout);
            timeout = setTimeout(function () {
              func.apply(context, args);
            }, wait);
          };
        }
  
        function updateProgressBar() {
          var scrollTop = $(window).scrollTop();
          var docHeight = $(document).height();
          var winHeight = $(window).height();
          var footerHeight = $("<footer>").height();
          var scrollPercent = (scrollTop / (docHeight - winHeight + footerHeight)) * 100;
          $("#reading-progress-bar").css("width", scrollPercent + "%");
        }
  
        $(window).on("scroll", debounce(updateProgressBar, 100));
      }
    };
  
    // Execute functions conditionally
    executeFunction('wrapBlogTitle', functions.wrapBlogTitle);
    executeFunction('addClassesToTitle', functions.addClassesToTitle);
    executeFunction('moveAuthorToAside', functions.moveAuthorToAside);
    executeFunction('processAuthorNames', functions.processAuthorNames);
    executeFunction('handleImages', functions.handleImages);
    executeFunction('moveAuthorDateWrapper', functions.moveAuthorDateWrapper);
    executeFunction('addLineBreaksToPoem', functions.addLineBreaksToPoem);
    executeFunction('formatDatePublished', functions.formatDatePublished);
    executeFunction('createProgressBar', functions.createProgressBar);
  });
  