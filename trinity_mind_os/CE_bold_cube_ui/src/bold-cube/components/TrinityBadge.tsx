import React from 'react';
import { PhaseId, getPhaseSymbol, getPhaseBadgeStyle, getCoreFromPhase } from '../constants/trinity-colors';

interface TrinityBadgeProps {
    phase: PhaseId;
    size?: 'sm' | 'md' | 'lg';
    showLabel?: boolean;
}

export const TrinityBadge: React.FC<TrinityBadgeProps> = ({
    phase,
    size = 'md',
    showLabel = true
}) => {
    const badge = getPhaseBadgeStyle(phase);
    const symbol = getPhaseSymbol(phase);
    const core = getCoreFromPhase(phase);

    const sizeStyles = {
        sm: { padding: '2px 8px', fontSize: '9px', gap: '3px' },
        md: { padding: '4px 12px', fontSize: '10px', gap: '4px' },
        lg: { padding: '6px 16px', fontSize: '11px', gap: '6px' },
    };

    const style = sizeStyles[size];

    return (
        <div
            style={{
                background: badge.bg,
                border: `1px solid ${badge.border}`,
                color: badge.text,
                padding: style.padding,
                borderRadius: '12px',
                fontSize: style.fontSize,
                fontWeight: 'bold',
                display: 'inline-flex',
                alignItems: 'center',
                gap: style.gap,
                userSelect: 'none',
            }}
        >
            <span>{symbol}</span>
            {showLabel && (
                <>
                    <span>{core}</span>
                    {phase !== 'SR0' && phase.slice(-1) !== '0' && (
                        <span style={{ opacity: 0.7 }}>{phase.slice(-1)}</span>
                    )}
                </>
            )}
        </div>
    );
};
