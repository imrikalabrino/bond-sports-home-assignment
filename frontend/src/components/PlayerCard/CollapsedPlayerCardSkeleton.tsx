import React from 'react';
import './PlayerCardSkeleton.scss';

const CollapsedPlayerCardSkeleton: React.FC = () => {
    return (
        <div className="player-card-skeleton collapsed">
            <div className="skeleton-header">
                <div className="skeleton-jersey"></div>
                <div className="skeleton-info">
                    <div className="skeleton-name"></div>
                    <div className="skeleton-details"></div>
                </div>
                <div className="skeleton-favorite"></div>
            </div>
        </div>
    );
};

export default CollapsedPlayerCardSkeleton;
