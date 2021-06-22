describe('formedix home page', function() {
  it('should be able to be manipulated with APIs', async() => {
    browser.waitForAngularEnabled(false)
    browser.get('https://www.formedix.com/');
    expect(browser.getTitle()).toEqual('Clinical Metadata Repository | Clinical Trial Automation Software');

    element(by.css('rs-bullet[data-key="rs-72"]')).click();
    
    //browser.sleep(18000);

    const ryzeFeaturesArr = ["PREVIEW eCRFs",
    "ANNOTATE FORMS",
    "CONVERT TO CDISC",
    "BUILD EDIT CHECKS",
    "IMPORT FROM EDCS",
    "VALIDATE EDC BUILDS"];

    const sortedArr = [];

    console.log("current text: " + await element(by.css('.ultimate-typed-main')).getText());

    for (let j = 0; j < ryzeFeaturesArr.length; j++) {
      let str = await element(by.css('.ultimate-typed-main')).getText();
      if (str.charAt(0) === ryzeFeaturesArr[j].charAt(0)) {
        sortedArr[0] = ryzeFeaturesArr[j];
        let top = false;
        if (j == ryzeFeaturesArr.length-1) {
          j = -1;
          top = true;
        }
        
        for (let k = 1; k < ryzeFeaturesArr.length; k++) {
          sortedArr[k] = ryzeFeaturesArr[++j];
          if (j == ryzeFeaturesArr.length-1 && top == false)
            j = -1;
        }
        break;
      }
      else if (str.length == 0)
        j = 0;
    }

    for (let i = 0; i < sortedArr.length; i++)
      console.log("sortedArr[" + i + "]: " + sortedArr[i]);

    browser.actions().mouseMove(element(by.css('.ultimate-typed-main'))).perform();
    
    for (let i = 0; i < sortedArr.length; i++) {
      //let featureDisplayed = false;

      var ec = protractor.ExpectedConditions;

      ec.textToBePresentInElement(element(by.css('.ultimate-typed-main')), sortedArr[i]);

      await browser.wait(ec.textToBePresentInElement(element(by.css('.ultimate-typed-main')), sortedArr[i]), 8000, "wait 8s for phrase");
      
      let str = await element(by.css('.ultimate-typed-main')).getText();
      console.log("current text: " + str + " | iter:" + i);

      /*
      var sI = setInterval(
        function() {
          console.log("inside setInterval");
          if (str == sortedArr[i])
            featureDisplayed = true;
        }, 100
      );

      var sT = setTimeout(
        function () {
          console.log("inside setTimeout");
          clearInterval(sI);
          expect(featureDisplayed).toEqual(true);
        }, 8000
      );

      setInterval(
        function() {
          if (featureDisplayed == true) {
            clearInterval(sI);
            clearTimeout(sT);            
          }
        }, 50
      );*/
    }
  });
});