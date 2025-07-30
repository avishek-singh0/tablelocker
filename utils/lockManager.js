const locks = {};

function cleanupExpiredLocks() {
    const now = Date.now();
    for (const tableId in locks) {
        if (locks[tableId].expiry < now) {
            delete locks[tableId];
        }
    }
}

module.exports = {
    lock(tableId, userId, duration) {
        cleanupExpiredLocks();

        if (locks[tableId]) {
            return {
                success: false,
                message: 'Table is currently locked by another user.',
            };
        }

        locks[tableId] = {
            userId,
            expiry: Date.now() + duration * 1000,
        };

        return {
            success: true,
            message: 'Table locked successfully.',
        };
    },

    unlock(tableId, userId) {
        if (locks[tableId] && locks[tableId].userId === userId) {
            delete locks[tableId];
        }
    },

    isLocked(tableId) {
        cleanupExpiredLocks();
        return !!locks[tableId];
    },
};