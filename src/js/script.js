/* eslint-disable indent */
'use strict';

const select = {
    bookList: '.books-list',
    books: '.book__image', 
    favorite: 'favorite',
    booksList: '.books-list',
    filters: '.filters'
};

const templates = {
    bookTemplate: Handlebars.compile(document.querySelector('#template-book').innerHTML),
};

class BooksList{
    constructor(data){
      const thisBook = this;
      thisBook.data = data;
      thisBook.render();
      thisBook.initActions();
    }

    render(){
    const thisBook = this;
    const books = thisBook.data;
        for(let book of books){     
            console.log(book);       
            book.ratingBgc = thisBook.determineRatingBgc(book.rating);
            book.ratingWidth = book.rating * 10;
            const generatedHTML = templates.bookTemplate(book);
            const bookContainer = document.querySelector(select.bookList);
            const elemntOfBook = utils.createDOMFromHTML(generatedHTML);
            bookContainer.appendChild(elemntOfBook);
        }
    }

    initActions(){
        const thisBook = this;
        let favoriteBooks = [];
        let filters = [];
        const bookElement = document.querySelector(select.booksList);
        const filterElement = document.querySelector(select.filters);
        bookElement.addEventListener('dblclick', event => {
            const bookId = event.target.parentNode.parentNode;
            if(bookId.classList.contains('book__image')){
                if(favoriteBooks.includes(bookId.getAttribute('data-id'))){
                    for( var i = 0; i < favoriteBooks.length; i++){                                    
                        if ( favoriteBooks[i] === bookId.getAttribute('data-id')) { 
                            favoriteBooks.splice(i, 1); 
                            i--; 
                        }
                    }
                    bookId.classList.remove(select.favorite);
                }else{
                    favoriteBooks.push(bookId.getAttribute('data-id'));
                    bookId.classList.add(select.favorite);
                }
            }        
            console.log(event.target,favoriteBooks,bookId);
        });
        filterElement.addEventListener('click', event =>{
            if(event.target.getAttribute('type') === 'checkbox'){
                if(event.target.checked){
                    filters.push(event.target.value);
                }else{
                    for( var i = 0; i < filters.length; i++){                                    
                        if ( filters[i] === event.target.value) { 
                            filters.splice(i, 1); 
                            i--; 
                        }
                    }
                }
                thisBook.addHidenClass(filters);
            }
            console.log(event.target,filters);
        });
    }

    addHidenClass(arr){
        const books = dataSource.books;
        for(let book of books){
            if(book.details.adults && arr.includes('adults') || book.details.nonFiction && arr.includes('nonFiction')){
                document.querySelector('.book__image[data-id="'+book.id+'"]').classList.add('hidden');
            }else{
                document.querySelector('.book__image[data-id="'+book.id+'"]').classList.remove('hidden');
            }        
        }
    }

    determineRatingBgc(rating){
        let background;
        if(rating < 6){
        background = 'linear-gradient(to bottom,  #fefcea 0%, #f1da36 100%)';
        } else if(rating > 6 && rating <= 8){
        background = 'linear-gradient(to bottom, #b4df5b 0%,#b4df5b 100%)';
        } else if (rating > 8 && rating <= 9){
        background = 'linear-gradient(to bottom, #299a0b 0%, #299a0b 100%)';
        }
        else if (rating > 9){
        background = 'linear-gradient(to bottom, #ff0084 0%,#ff0084 100%)';
        }
        return background;
    }
}

const app = new BooksList(dataSource.books);
app;