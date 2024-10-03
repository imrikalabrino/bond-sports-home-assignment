import React from 'react';

const ExpandedPlayerCardSkeleton: React.FC = () => {
    return (
        <div className="player-card-skeleton expanded">
            <div className="skeleton-details">
                <div className="skeleton-info-row">
                    <div className="skeleton-info-item"></div>
                    <div className="skeleton-info-item"></div>
                </div>
                <div className="skeleton-info-row">
                    <div className="skeleton-info-item"></div>
                    <div className="skeleton-info-item"></div>
                    <div className="skeleton-info-item"></div>
                </div>
                <div className="skeleton-stats">
                    <div className="skeleton-stat"></div>
                    <div className="skeleton-stat"></div>
                    <div className="skeleton-stat"></div>
                </div>
            </div>
        </div>
    );
};

export default ExpandedPlayerCardSkeleton;
