angular.module('45d4feef-f97b-4926-ac50-e7e19d232351')
    .factory('AddressBookService', addressBookService);

function addressBookService($http) {

    var BASE_URL = localStorage.getItem('_cc.libraryUrl') + '/services/C3i-Addressbook/ws/';
    var authToken;
    var agentHandle;

    function start(token,userHandle) {
        if (token) {
            authToken = token;
            agentHandle = userHandle;          
            return {
                getContacts: getContacts,
                getContact: getContact,
                addContact: addContact,
                updateContact: updateContact,
                deleteContact: deleteContact,
                getEmptyContact: getEmptyContact,
                getUserRole: getUserRole,
                getSupervisor: getSupervisor,
                getSupervisors: getSupervisors
            };
        } else {
            return undefined;
            }
            }

    function getContacts(supervisorHandle) {
        return $http({
            url: BASE_URL + 'contacts' + (supervisorHandle ? '/' + supervisorHandle : ''),
            method: 'GET',
            headers: {
                'Authorization': authToken
            },
            params: {
            	'agentHandle': agentHandle
            }
        });
                }

    function getContact(contactId) {
        return $http({
            url: BASE_URL + 'contact/' + contactId,
            method: 'GET',
            headers: {
                'Authorization': authToken
                },
        	params: {
        		'agentHandle': agentHandle
        	}
        });
    }

    function addContact(contact) {
        return $http({
            url: BASE_URL + 'contact',
            method: 'POST',
            headers: {
                'Authorization': authToken
            },
        	params: {
                'agentHandle': agentHandle
            },
            data: contact
        });
            }

    function updateContact(contact) {
        return $http({
            url: BASE_URL + 'contact',
            method: 'PUT',
            headers: {
                'Authorization': authToken
            },
        	params: {
                'agentHandle': agentHandle
            },
            data: contact
        });
            }

    function deleteContact(contactId) {
        return $http({
            url: BASE_URL + 'contact/' + contactId,
            method: 'DELETE',
            headers: {
                'Authorization': authToken
            },
        	params: {
                'agentHandle': agentHandle
            }
        });
            }

    function getUserRole() {
        return $http({
            url: BASE_URL + 'agentrole',
            method: 'GET',
            headers: {
                'Authorization': authToken
            },
        	params: {
                'agentHandle': agentHandle
            }
        });
    }

    function getSupervisor() {
        return $http({
            url: BASE_URL + 'supervisor',
            method: 'GET',
            headers: {
                'Authorization': authToken
            },
        	params: {
        		'agentHandle': agentHandle
        	}
        });
            }

    function getSupervisors(role) {
        return $http({
            url: BASE_URL + 'organizations/' + role,
            method: 'GET',
            headers: {
                'Authorization': authToken
            },
        	params: {
        		'agentHandle': agentHandle
        	}
            });
    }

    function getEmptyContact() {
        return {
            firstname: '',
            lastname: '',
            phone: '',
            extension: '',
            email: '',
            organization: ''
        };
    }

    return {
        start: start
    };
}
