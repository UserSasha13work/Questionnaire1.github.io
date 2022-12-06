let forms=document.querySelector('#forms');
let done=document.querySelector('.done');
let load_pay=document.querySelector('.load_pay');
class FormHandler {
  constructor(selector) {
    this.form = document.querySelector(selector);
    this.classToHide = "d-none";
    this.mask = {};

    this.init();
  }

  validate($form) {
    const $inputs = $form.querySelectorAll("input");
    let errors = 0;
    $inputs.forEach(($input) => {
      if (this.validateInput($input)) errors++;
    });

    if (errors > 0) return false;
    else return true;
  }

  validateInput($input) {
    const $inputWrap = $input.closest(".input-wrap");
    const $error = $inputWrap.querySelector(".error-msg");
    let error = false;

    if ($input.name && $input.name === "card") error = this.checkCardNumber();
    if ($input.name && $input.name === "date") error = this.checkCardDate();
    if ($input.name && $input.name === "cvv") error = this.checkCardCVV();

    if (error) {
      $inputWrap.classList.add("error");
      $error.innerText = error;
    } else {
      $inputWrap.classList.remove("error");
      $error.innerText = "";
    }

    return error;
  }

  checkCardNumber() {
    const value = this.mask.cardNumber.unmaskedValue;

    let error = false;
    if (!value) error = "Enter your card number please";
    else if (value.length < 16) error = "Enter valid card number please";

    return error;
  }

  checkCardDate() {
    const value = this.mask.cardDate.unmaskedValue;

    let error = false;
    if (!value) error = "Enter your card date please";
    else if (value.length < 4) error = "Enter valid card date please";

    return error;
  }

  checkCardCVV() {
    const value = this.mask.cardCVV.unmaskedValue;

    let error = false;
    if (!value) error = "Enter your card cvv please";
    else if (value.length < 3) error = "Enter valid card cvv please";

    return error;
  }

  // submitForm() {
  //   const preloader = this.page.querySelector(".submit-preloader");
  //   preloader.classList.remove(this.classToHide);
  //   const formData = new FormData(this.form);

  //   for (let elem of formData.entries()) {
  //     const key = elem[0];
  //     const value = elem[1];

  //     if (key === "phone") {
  //       data[key] = value.replace(/\D+/g, "");
  //     } else if (key === "email") {
  //       data[key] = value.toLowerCase();
  //     } else {
  //       data[key] = value;
  //     }
  //   }

  //   // Display the key/value pairs
  //   // console.log(JSON.stringify(data));
  //   // return;

  //   fetch("https://api" + location.search, {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify(data),
  //   }).then((response) => {
  //     location.href = "./success.html" + location.search;
  //   });
  // }

  submitHandler = (e) => {
    e.preventDefault();

    if (this.validate(this.form)) {
      e.preventDefault();

      
      
      forms.style.display = 'none'; 
      load_pay.style.display = 'flex'; 

      
        setTimeout(function(){
            
          
          load_pay.style.display = 'none'; 
          done.style.display = 'block'; 
    
      },3000)
        
      
      

      // console.log("submit");
      //   this.submitForm();
    }
  };

  inputHandler = (e) => {
    const $target = e.target;

    if ($target.tagName === "INPUT" && $target.closest(".input-wrap")) {
      const $inputWrap = $target.closest(".input-wrap");
      const $error = $inputWrap.querySelector(".error-msg");

      $inputWrap.classList.remove("error");
      $error.innerText = "";
    }
  };
  
  init() {
    this.mask.cardNumber = IMask(this.form.querySelector('input[name="card"]'), {
        mask: 'XXXX XXXX XXXX XXXX',
        autofix: true,
        lazy: false,
        blocks: {
            X: {mask: IMask.MaskedRange, placeholderChar: 'X', from: 0, to: 9, maxLength: 1},
        }
      });

      this.mask.cardDate = IMask(this.form.querySelector('input[name="date"]'), {
        mask: 'M/Y',
        autofix: true,
        lazy: false,
        blocks: {
            Y: {mask: IMask.MaskedRange, placeholderChar: 'Y', from: 0, to: 99, maxLength: 2},
            M: {mask: IMask.MaskedRange, placeholderChar: 'M', from: 1, to: 12, maxLength: 2},
        }
      });

      this.mask.cardCVV = IMask(this.form.querySelector('input[name="cvv"]'), {
        mask: 'DDD',
        autofix: true,
        lazy: false,
        blocks: {
            D: {mask: IMask.MaskedRange, placeholderChar: '•', from: 0, to: 9, maxLength: 1},
        }
      });

    this.form.addEventListener("input", this.inputHandler);
    this.form.addEventListener("submit", this.submitHandler);
  }
}

const formHandler = new FormHandler("#form");
