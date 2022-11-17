// RecipePreview.js

class RecipePreview extends HTMLElement {
    // Called once when document.createElement('recipe-preview') is called, or
    // the element is written into the DOM directly as <recipe-preview>
    constructor() {
      super(); // Inheret everything from HTMLElement
  
      let shadowEl = this.attachShadow({mode:'open'});
      
      let articleEl = document.createElement('article');
      let styleEl = document.createElement('style');

      styleEl.innerHTML = `* {
        font-family: sans-serif;
        margin: 0;
        padding: 0;
      }
    
      a {
        text-decoration: none;
      }
    
      a:hover {
        text-decoration: underline;
      }
    
      article {
        align-items: center;
        border: 1px solid rgb(223, 225, 229);
        border-radius: 8px;
        display: grid;
        grid-template-rows: 118px 56px 14px 18px 15px 36px;
        height: auto;
        row-gap: 5px;
        padding: 0 16px 16px 16px;
        width: 178px;
      }
    
      div.rating {
        align-items: center;
        column-gap: 5px;
        display: flex;
      }
    
      div.rating>img {
        height: auto;
        display: inline-block;
        object-fit: scale-down;
        width: 78px;
      }
    
      article>img {
        border-top-left-radius: 8px;
        border-top-right-radius: 8px;
        height: 118px;
        object-fit: cover;
        margin-left: -16px;
        width: calc(100% + 32px);
      }
    
      p.ingredients {
        height: 32px;
        line-height: 16px;
        padding-top: 4px;
        overflow: hidden;
      }
    
      p.organization {
        color: black !important;
      }
    
      p.title {
        display: -webkit-box;
        font-size: 16px;
        height: 36px;
        line-height: 18px;
        overflow: hidden;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
      }
    
      p:not(.title),
      span,
      time {
        color: #70757A;
        font-size: 12px;
      }`;
      shadowEl.appendChild(articleEl);
      shadowEl.appendChild(styleEl);
    }
  
    /**
     * Called when the .data property is set on this element.
     *
     * For Example:
     * let RecipePreview = document.createElement('recipe-preview'); // Calls constructor()
     * RecipePreview.data = { foo: 'bar' } // Calls set data({ foo: 'bar' })
     *
     * @param {Object} data - The data to pass into the <recipe-preview>, must be of the
     *                        following format:
     *                        {
     *                          "imgSrc": "This is an absolute path on user's cpu",
     *                          "recipeName": "String",
     *                          "mealType": [],
     *                          "totalTime": 0,                            
     *                          "ingredients": [],                 
     *                          "steps": [],
     *                          "favorite": false,                     
     *                          "tools": [],                    
     *                          "difficulty": "String",
     *                          "notes": "String"
     *                        }                  
     */
    set data(data) {
      // If nothing was passed in, return
      if (!data) return;
  
      let articleEl = this.shadowRoot.children[0];
    
      articleEl.innerHTML = `<img src='${data["imgSrc"]}' alt='Recipe Image'>
                             <a href='/cse110-sp21-group36/source/recipe_viewer.html'>${data["recipeName"]}</a>
                             <p>${data["mealType"]}</p>
                             <p>${data["totalTime"]}</p>
                             <p>${data["ingredients"]}</p>
                             <p>${data["steps"]}</p>
                             <p>${data["favorite"]}</p>
                             <p>${data["tools"]}</p>
                             <p>${data["difficulty"]}</p>
                             <p>${data["notes"]}</p>`;
  
    }
  }

  customElements.define('recipe-preview', RecipePreview)