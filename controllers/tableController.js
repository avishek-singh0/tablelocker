const LockManager = require('../utils/lockManager');

exports.lockTable = (req, res) => {
    const { tableId, userId, duration } = req.body;
    const result = LockManager.lock(tableId, userId, duration);

    if (result.success) {
        return res.status(200).json(result);
    } else {
        return res.status(409).json(result);
    }
};

exports.unlockTable = (req, res) => {
    const { tableId, userId } = req.body;
    LockManager.unlock(tableId, userId);
    res.status(200).json({ success: true, message: "Table unlocked (if owned by user)." });
};

exports.getTableStatus = (req, res) => {
    const { tableId } = req.params;
    const isLocked = LockManager.isLocked(tableId);
    res.status(200).json({ isLocked });
};