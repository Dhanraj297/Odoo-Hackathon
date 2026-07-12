const Badge = require('../models/Badge');
const User = require('../models/User');
const Notification = require('../models/Notification');

const autoBadgeAward = async (io) => {
  try {
    const badges = await Badge.find({ isActive: true });
    const users = await User.find({ isActive: true }).populate('badges');

    for (const user of users) {
      const earnedBadgeIds = user.badges.map(b => b._id.toString());

      for (const badge of badges) {
        if (earnedBadgeIds.includes(badge._id.toString())) continue;

        let qualifies = false;
        const rule = badge.unlockRule;

        switch (rule.type) {
          case 'xp':
            qualifies = user.xp >= rule.threshold;
            break;
          case 'challenges_completed':
            qualifies = user.completedChallenges >= rule.threshold;
            break;
          case 'points':
            qualifies = user.points >= rule.threshold;
            break;
          default:
            qualifies = false;
        }

        if (qualifies) {
          user.badges.push(badge._id);
          if (badge.xpBonus > 0) user.xp += badge.xpBonus;
          await user.save();

          const notif = await Notification.create({
            user: user._id,
            type: 'badge_unlocked',
            title: '🏆 Badge Unlocked!',
            message: `You earned the "${badge.name}" badge! ${badge.description}`,
            data: { badgeId: badge._id }
          });

          if (io) io.to(user._id.toString()).emit('notification', notif);
        }
      }
    }
  } catch (err) {
    console.error('Badge auto-award error:', err);
  }
};

module.exports = { autoBadgeAward };
