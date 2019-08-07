const {
    createUser,
    checkPanicStatus,
    login,
    signup,
    joinGroup,
    createGroup,
    getMyGroups,
    upload,
    createLocation,
    groupMembers,
    getLocation,
    getChatId,
    togglePanicStatus,
    getRoutes,
    getScheduleForToday,
    createSchedule,
    savePushToken
} = require('../db/helpers/request-handlers')

describe('request handler configuartions', () => {
    test('login is defined', () => {
    expect(login).toBeDefined();
    });

    test('checkPanicStatus is defined', () => {
        expect(checkPanicStatus).toBeDefined();
    });

    test('signup is defined', () => {
        expect(signup).toBeDefined();
    });

    test('joinGroup is defined', () => {
        expect(joinGroup).toBeDefined();
    });

    test('createGroup is defined', () => {
        expect(createGroup).toBeDefined();
    });

    test('getMyGroups is defined', () => {
        expect(getMyGroups).toBeDefined();
    });

    test('upload is defined', () => {
        expect(upload).toBeDefined();
    });

    test('createLocation is defined', () => {
        expect(createLocation).toBeDefined();
    });

    test('groupMembers is defined', () => {
        expect(groupMembers).toBeDefined();
    });

    test('getLocation is defined', () => {
        expect(getLocation).toBeDefined();
    });

    test('getChatId is defined', () => {
        expect(getChatId).toBeDefined();
    });

    test('getScheduleForToday is defined', () => {
        expect(getScheduleForToday).toBeDefined();
    });

    test('togglePanicStatus is defined', () => {
        expect(togglePanicStatus).toBeDefined();
    });

    test('createSchedule is defined', () => {
        expect(createSchedule).toBeDefined();
    });

    test('savePushToken is defined', () => {
        expect(savePushToken).toBeDefined();
    });
});