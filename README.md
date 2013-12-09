angularjs-wizard-directive
==========================

angularjs wizard directive


![ScreenShot](https://raw.github.com/andrepinto/angularjs-wizard-directive/master/screenshots/im1.png)

![ScreenShot](https://raw.github.com/andrepinto/angularjs-wizard-directive/master/screenshots/im2.png)

![ScreenShot](https://raw.github.com/andrepinto/angularjs-wizard-directive/master/screenshots/im4.png)

## Dependencies
  
  * angularjs
  * twitter bootstrap (css only)
  


## How to use it

###See sample folder

```
var app = angular.module('app', ['widgets']);
```
### Directives

* Directive wizard - main directive (have n wizard-group)
* Directive wizard-group - content directive
 
```html
<wizard config="wizard" on-validation-step="vm.validationStep" on-completed-wizard="vm.completeWizard" next="next" previous="previous" end="Finish">
        <wizard-group title="Account Data" active="true">
           ...
        </wizard-group>
        <wizard-group title="Profile">
           ...
        </wizard-group>
        
    </wizard>
```

### Methods

* on-validation-step - fired when change step
* on-completed-wizard - fired when finish button is clicked

###Controller

```javascript
 vm.validationStep = function(item, actions) {
      if(vm.user.email.length<=0)
          actions.error(['email is required']);
      else
          actions.success();
  }

  vm.completeWizard = function(scope, actions) {
      console.log('completed');
  }
       
```

* item object - contains step info

```javascript
{name: "Account Data", index: 0, active: "active"}
```

* action object - contains callback functions

```javascript
{success: function, error: function}
```


## Grunt and Bower tasks

* Install dependencies

```javascript
 bower install
```

* Build directive

```javascript
 grunt build
``` 

* Build sample

```javascript
 grunt sample
``` 
