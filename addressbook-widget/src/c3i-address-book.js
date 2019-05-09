angular.module('45d4feef-f97b-4926-ac50-e7e19d232351', [
    'core.services.WidgetAPI'
]).directive('c3iAddressBook', widgetComponent);

function widgetComponent(WidgetAPI, $mdDialog, AddressBookService, $timeout) {

    function widgetContainer(scope, element, params) {

        var api = new WidgetAPI(params);
        scope.userConfiguration = api.getConfiguration();

        var addressBookService = AddressBookService.start(scope.userConfiguration.token,scope.userConfiguration.handle);
        var ccUser = JSON.parse(localStorage.getItem('_cc.user'));
        scope.contacts = [];
        scope.role = 'AGENT';
        scope.supervisorsData = {
            supervisors: [],
            selectedSupervisor: ''
            };
        
        addressBookService.getUserRole().then(
            function (response) {
            	scope.role = response.data.role;
            }, function (response) {
                scope.updateContactList();
                console.warn('[C3I-ADDRESS-BOOK-WIDGET] Request for getting agent role failed', response);
                api.sendNotification('error', 'Request for getting agent role failed');
                }
        );
        
        
        addressBookService.getSupervisors(scope.role).then(
                function (response) {
                	 scope.supervisorsData.supervisors = response.data.organizationList;
                     scope.supervisorsData.selectedSupervisor = response.data.organizationList[0];
                     scope.updateContactList();
                }, function (response) {
                    console.warn('[C3I-ADDRESS-BOOK-WIDGET] Request for getting current agent supervisor failed', response);
                    api.sendNotification('error', 'Request for getting current agent supervisor failed');
                }
            );
        
           
        scope.updateContactList = function () {
          /*  if (scope.role !== 'SUPER_ADMIN') {
                scope.contactsGettingPromise = addressBookService.getContacts().then(
                function (response) {
                    scope.contacts = response.data.contactList;
                }, function (response) {
                    console.warn('[C3I-ADDRESS-BOOK-WIDGET] Request for getting contacts failed', response);
                        api.sendNotification('error', 'Request for getting contacts failed');
                }
            );
            } else {*/
                scope.contactsGettingPromise = addressBookService.getContacts(scope.supervisorsData.selectedSupervisor).then(
                function (response) {
                    scope.contacts = response.data.contactList;
                }, function (response) {
                    console.warn('[C3I-ADDRESS-BOOK-WIDGET] Request for getting contacts failed', response);
                        api.sendNotification('error', 'Request for getting contacts failed');
                }
            );            
        };

        scope.editContact = function (contactId) {
            addressBookService.getContact(contactId).then(
                function (response) {
                    scope.editingContact = response.data.contactList[0];
                }, function (response) {
                    console.warn('[C3I-ADDRESS-BOOK-WIDGET] Request for getting contact failed', response);
                    api.sendNotification('error', 'Request for getting contact failed');
            }
        );
        };

        scope.openContact = function (contact) {           
            addressBookService.getContact(contact.contactId).then(
                function (response) {
                    scope.openedContact = response.data.contactList[0];
                }, function (response) {
                    console.warn('[C3I-ADDRESS-BOOK-WIDGET] Request for getting contact failed', response);
                    api.sendNotification('error', 'Request for getting contact failed');
                }
            );         
        };

        scope.closeContact = function () {
            scope.openedContact = undefined;
        };

        scope.showDeleteConfirm = function(event, contact) {
            var confirm = $mdDialog.confirm()
                .title('Delete confirmation')
                .textContent('Are you sure you want to delete contact ' + contact.firstname + ' ' + contact.lastname + '?')
                    .targetEvent(event)
                .ok('Delete')
                .cancel('Cancel');
            $mdDialog.show(confirm).then(function() {
                addressBookService.deleteContact(contact.contactId).then(
                        function () {
                            scope.updateContactList();
                        }, function (response) {
                        console.warn('[C3I-ADDRESS-BOOK-WIDGET] Request for deleting contact failed', response);
                            api.sendNotification('error', 'Request for deleting contact failed');
                    }
                );
            }, function() {});
        };

        scope.addContact = function () {         	
        		scope.editingContact = addressBookService.getEmptyContact();
                scope.editingContact.organization = scope.supervisorsData.selectedSupervisor;   
           /* scope.editingContact = addressBookService.getEmptyContact();
            scope.editingContact.organization = scope.supervisorsData.selectedSupervisor;   */        
        };

        scope.cancelEditing = function () {
            scope.editingContact = undefined;
        };

        scope.saveContact = function () {
            addressBookService.updateContact(scope.editingContact).then(
                function () {
                    scope.editingContact = undefined;
                    scope.updateContactList();
                }, function (response) {
                    console.warn('[C3I-ADDRESS-BOOK-WIDGET] Request for updating contact failed', response);
                    api.sendNotification('error', 'Request for updating contact failed');
            }
        );
        };

        scope.createContact = function () {
            addressBookService.addContact(scope.editingContact).then(
                function () {
                    scope.editingContact = undefined;
                    scope.updateContactList();
                }, function (response) {
                    console.warn('[C3I-ADDRESS-BOOK-WIDGET] Request for adding contact failed', response);
                    api.sendNotification('error', 'Request for adding contact failed');
            }
        );
        };

        element.on('$destroy', function () {
            api.unregister();
            });

    }

    return {
        scope: {},
        replace: true,
        template: template,
        link: widgetContainer
    };
}
