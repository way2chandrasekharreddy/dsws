angular.module('45d4feef-f97b-4926-ac50-e7e19d232351')
    .factory('AddressBookServiceTEST', addressBookServiceTEST);

function addressBookServiceTEST($q) {

    //var BASE_URL = 'https://192.168.2.138/services/C3i-Addressbook-1.0.0.0.0/ws/';
    var testIds = 12;

    function start(token) {
        if (token) {
            return {
                getContacts: getContactsTest,
                getContact: getContactTest,
                addContact: addContactTest,
                updateContact: updateContactTest,
                deleteContact: deleteContactTest,
                getEmptyContact: getEmptyContact,
                getUserRole: getUserRoleTest,
                getSupervisor: getSupervisorTest,
                getSupervisors: getSupervisorsTest
            };
        } else {
            return undefined;
        }
    }

    function getContactsTest(supervisorHandle) {
        var deferred = $q.defer();
        setTimeout(function() {
            var supContacts = [];
            var supHandle = supervisorHandle || supervisors[0].supervisorHandle;
            contacts.forEach(function(contact) {
                if (contact.supervisor === supHandle) {
                    supContacts.push(contact);
                }
            });
            deferred.resolve({
                data: {
                    contactList: supContacts
                }
            });
        }, 3000);
        return deferred.promise;
    }

    function getContactTest(contactId) {
        var deferred = $q.defer();
        setTimeout(function() {
            var contactIndex = contacts.findIndex(function (element) {
                return element.contactId === contactId;
            });
            deferred.resolve({
                data: {
                    contactList: [contacts[contactIndex]]
                }
            });
        }, 1000);
        return deferred.promise;
    }

    function addContactTest(contact) {
        var deferred = $q.defer();
        setTimeout(function() {
            contact.contactId = testIds++;
            contact.createdby = 'agent1@avaya.com';
            contact.supervisor = 'sup1@avaya.com';
            contacts.push(contact);
            deferred.resolve();
        }, 1000);
        return deferred.promise;
    }

    function updateContactTest(contact) {
        var deferred = $q.defer();
        setTimeout(function() {
            var contactInArray = contacts.find(function (element) {
                return element.contactId === contact.contactId;
            });
            if (contactInArray) {
                contactInArray = contact;
            }
            deferred.resolve();
        }, 1000);
        return deferred.promise;
    }

    function deleteContactTest(contactId) {
        var deferred = $q.defer();
        setTimeout(function() {
            var contactIndex = contacts.findIndex(function (element) {
                return element.contactId === contactId;
            });
            if (contactIndex !== undefined) {
                contacts.splice(contactIndex, 1);
            }
            deferred.resolve();
        }, 1000);
        return deferred.promise;
    }

    function getUserRoleTest() {
        var deferred = $q.defer();
        setTimeout(function() {
            deferred.resolve({
                data: {
                    role: 'AGENT' //AGENT, ADMIN, SUPER_ADMIN
                }
            });
        }, 1000);
        return deferred.promise;
    }

    function getSupervisorTest() {
        var deferred = $q.defer();
        setTimeout(function() {
            deferred.resolve({
                data: {
                    supervisorList: [supervisors[0]]
                }
            });
        }, 1000);
        return deferred.promise;
    }

    function getSupervisorsTest() {
        var deferred = $q.defer();
        setTimeout(function() {
            deferred.resolve({
                data: {
                    supervisorList: supervisors
                }
            });
        }, 1000);
        return deferred.promise;
    }

    function getEmptyContact() {
        return {
            firstname: '',
            lastname: '',
            phone: '',
            extension: '',
            email: ''
        };
    }

    var contacts = [{
        contactId: 0,
        firstname: 'Bill',
        lastname: 'Withers',
        phone: '052254785',
        extension: '4132',
        sort_as: 'firstname',
        email: 'bWithers@avaya.com',
        createdby: 'agent1@avaya.com',
        supervisor: 'sup1@avaya.com'
    }, {
        contactId: 1,
        firstname: 'Morty',
        lastname: 'Smith',
        phone: '0565874541',
        extension: '4133',
        sort_as: 'firstname',
        email: 'mSmith@avaya.com',
        createdby: 'agent1@avaya.com',
        supervisor: 'sup1@avaya.com'
    }, {
        contactId: 2,
        firstname: 'Lincoln',
        lastname: 'Smith',
        phone: '0565874541',
        extension: '4133',
        sort_as: 'firstname',
        email: 'mSmith@avaya.com',
        createdby: 'agent1@avaya.com',
        supervisor: 'sup1@avaya.com'
    }, {
        contactId: 3,
        firstname: 'Tomas',
        lastname: 'Anderson',
        phone: '0565874541',
        extension: '4133',
        sort_as: 'firstname',
        email: 'mSmith@avaya.com',
        createdby: 'agent1@avaya.com',
        supervisor: 'sup1@avaya.com'
    }, {
        contactId: 4,
        firstname: 'Jacob',
        lastname: 'Miller',
        phone: '0565874541',
        extension: '4133',
        sort_as: 'firstname',
        email: 'mSmith@avaya.com',
        createdby: 'anotherAgent',
        supervisor: 'sup1@avaya.com'
    }, {
        contactId: 5,
        firstname: 'James',
        lastname: 'Brown',
        phone: '0565874541',
        extension: '4133',
        sort_as: 'firstname',
        email: 'mSmith@avaya.com',
        createdby: 'anotherAgent',
        supervisor: 'sup1@avaya.com'
    }, {
        contactId: 6,
        firstname: 'Gideon',
        lastname: 'Williams',
        phone: '0565874541',
        extension: '4133',
        sort_as: 'firstname',
        email: 'mSmith@avaya.com',
        createdby: 'agent1@avaya.com',
        supervisor: 'sup2@avaya.com'
    }, {
        contactId: 7,
        firstname: 'Blake',
        lastname: 'Johnson',
        phone: '0565874541',
        extension: '4133',
        sort_as: 'firstname',
        email: 'mSmith@avaya.com',
        createdby: 'anotherAgent',
        supervisor: 'sup2@avaya.com'
    }, {
        contactId: 8,
        firstname: 'Benjamin',
        lastname: 'Smith',
        phone: '0565874541',
        extension: '4133',
        sort_as: 'firstname',
        email: 'mSmith@avaya.com',
        createdby: 'anotherAgent',
        supervisor: 'sup2@avaya.com'
    }, {
        contactId: 9,
        firstname: 'Emmett',
        lastname: 'Walker',
        phone: '0565874541',
        extension: '4133',
        sort_as: 'firstname',
        email: 'mSmith@avaya.com',
        createdby: 'anotherAgent',
        supervisor: 'sup2@avaya.com'
    }, {
        contactId: 10,
        firstname: 'Christopher',
        lastname: 'Ronaldson',
        phone: '0565874541',
        extension: '4133',
        sort_as: 'firstname',
        email: 'mSmith@avaya.com',
        createdby: 'agent1@avaya.com',
        supervisor: 'sup2@avaya.com'
    }, {
        contactId: 11,
        firstname: 'Declan',
        lastname: 'King',
        phone: '0565874541',
        extension: '4133',
        sort_as: 'firstname',
        email: 'mSmith@avaya.com',
        createdby: 'agent1@avaya.com',
        supervisor: 'sup2@avaya.com'
    }];

    var supervisors = [{
        firstName: 'sup1',
        lastName: 'sup1',
        supervisorHandle: 'sup1@avaya.com'
    }, {
        firstName: 'sup2',
        lastName: 'sup2',
        supervisorHandle: 'sup2@avaya.com'
    }];

    return {
        start: start
    };
}
