import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, RotateCcw, Sparkles, Ruler, Scissors, Award, ArrowRight } from 'lucide-react';
import { playMeasureSound } from './audioHelper';

export const LAB_OBJECTS = [
  {
    id: 'pencil',
    name: 'HB Pencil',
    icon: '✏️',
    lengthCm: 12.4,
    color: '#F59E0B',
    bgColor: '#FEF3C7',
    desc: 'Wooden school pencil with graphite tip'
  },
  {
    id: 'comb',
    name: 'Hair Comb',
    icon: '🪮',
    lengthCm: 14.2,
    color: '#059669',
    bgColor: '#D1FAE5',
    desc: 'Plastic pocket comb with fine teeth'
  },
  {
    id: 'eraser',
    name: 'Rubber Eraser',
    icon: '🧼',
    lengthCm: 4.5,
    color: '#DC2626',
    bgColor: '#FEE2E2',
    desc: 'Rectangular soft rubber eraser'
  },
  {
    id: 'pen',
    name: 'Ballpoint Pen',
    icon: '🖊️',
    lengthCm: 13.8,
    color: '#2563EB',
    bgColor: '#DBEAFE',
    desc: 'Blue ink gel pen with pocket clip'
  },
  {
    id: 'key',
    name: 'Brass Key',
    icon: '🔑',
    lengthCm: 5.2,
    color: '#7C3AED',
    bgColor: '#EDE9FE',
    desc: 'Metallic key for room lock'
  }
];

export default function Table5_2MeasurementLab({ onUpdateTable, onCompleteLab }) {
  const [selectedObjectId, setSelectedObjectId] = useState('pencil');
  const [useBrokenScale, setUseBrokenScale] = useState(false);
  const [recordedTable, setRecordedTable] = useState({});
  const [isRulerAligned, setIsRulerAligned] = useState(true);

  const currentObj = LAB_OBJECTS.find(o => o.id === selectedObjectId) || LAB_OBJECTS[0];
  const startMark = useBrokenScale ? 1.0 : 0.0;
  const endMark = (startMark + currentObj.lengthCm).toFixed(1);

  const handleSelectObject = (id) => {
    playMeasureSound('click');
    setSelectedObjectId(id);
  };

  const handleRecordMeasurement = () => {
    playMeasureSound('correct');
    const newEntry = {
      length: `${currentObj.lengthCm} cm`,
      startMark: `${startMark.toFixed(1)} cm`,
      endMark: `${endMark} cm`,
      method: useBrokenScale ? 'Broken Scale (Subtracted)' : 'Standard Zero Alignment'
    };

    const updated = { ...recordedTable, [currentObj.id]: newEntry };
    setRecordedTable(updated);
    if (onUpdateTable) onUpdateTable(updated);

    if (Object.keys(updated).length === LAB_OBJECTS.length && onCompleteLab) {
      onCompleteLab();
    }
  };

  const handleReset = () => {
    playMeasureSound('click');
    setRecordedTable({});
    setSelectedObjectId('pencil');
  };

  const isRecorded = !!recordedTable[currentObj.id];
  const allRecorded = Object.keys(recordedTable).length === LAB_OBJECTS.length;

  return (
    <div className="table-lab-container">
      {/* Top Controller Bar: Object Selector Strip */}
      <div className="lab-objects-strip">
        <div className="strip-header-line">
          <span className="strip-tag">Select Object to Measure (Table 5.2):</span>
          <div className="broken-scale-toggle">
            <button
              onClick={() => { setUseBrokenScale(!useBrokenScale); playMeasureSound('click'); }}
              className={`broken-toggle-btn ${useBrokenScale ? 'active' : ''}`}
            >
              <Scissors size={14} />
              <span>{useBrokenScale ? 'Scale: Broken 0 Mark (Starts at 1.0 cm)' : 'Scale: Normal 0 Mark'}</span>
            </button>
          </div>
        </div>

        <div className="objects-pills-row">
          {LAB_OBJECTS.map((obj) => {
            const isSelected = obj.id === selectedObjectId;
            const isDone = !!recordedTable[obj.id];
            return (
              <button
                key={obj.id}
                onClick={() => handleSelectObject(obj.id)}
                className={`object-pill-btn ${isSelected ? 'selected' : ''} ${isDone ? 'done' : ''}`}
                style={{
                  borderColor: isSelected ? obj.color : '#E2E8F0',
                  backgroundColor: isSelected ? obj.bgColor : '#FFFFFF'
                }}
              >
                <span className="pill-icon">{obj.icon}</span>
                <span className="pill-title" style={{ color: isSelected ? obj.color : '#0F172A' }}>
                  {obj.name}
                </span>
                {isDone && <CheckCircle2 size={15} color="#10B981" />}
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Measurement Desk Canvas */}
      <div className="measurement-canvas-card">
        <div className="canvas-header-info">
          <div className="obj-active-meta">
            <span className="obj-big-icon">{currentObj.icon}</span>
            <div>
              <h4 className="obj-name" style={{ color: currentObj.color }}>{currentObj.name}</h4>
              <span className="obj-desc">{currentObj.desc}</span>
            </div>
          </div>

          <div className="live-readout-pill">
            <span className="readout-label">Formula Reading:</span>
            <span className="readout-math">
              {useBrokenScale ? `${endMark} cm − 1.0 cm = ` : ''}
              <strong>{currentObj.lengthCm} cm</strong>
            </span>
          </div>
        </div>

        {/* Visual Workbench with Object & Overlay Ruler */}
        <div className="ruler-measurement-workbench">
          {/* Object laid on workbench */}
          <div
            className="workbench-object-item"
            style={{
              left: `${(startMark / 16) * 100}%`,
              width: `${(currentObj.lengthCm / 16) * 100}%`,
              backgroundColor: currentObj.bgColor,
              borderColor: currentObj.color
            }}
          >
            <span className="item-text-tag" style={{ color: currentObj.color }}>
              {currentObj.name} ({currentObj.lengthCm} cm)
            </span>
            <div className="extent-marker start-marker" style={{ backgroundColor: currentObj.color }} />
            <div className="extent-marker end-marker" style={{ backgroundColor: currentObj.color }} />
          </div>

          {/* Calibrated 16-cm Ruler */}
          <div className="workbench-ruler-track">
            {useBrokenScale && (
              <div className="broken-overlay-zone" style={{ width: `${(1.0 / 16) * 100}%` }}>
                <span className="broken-text">Damaged 0 cm</span>
              </div>
            )}

            {Array.from({ length: 17 }).map((_, cm) => (
              <div
                key={cm}
                className={`bench-ruler-tick ${cm === Math.floor(startMark) || cm === Math.floor(startMark + currentObj.lengthCm) ? 'active-point' : ''}`}
                style={{ left: `${(cm / 16) * 100}%` }}
              >
                <div className="bench-tick-line" />
                <span className="bench-tick-digit">{cm}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Action Button & Confirmation */}
        <div className="measurement-action-bar">
          <div className="notation-tip">
            <span>💡 <strong>Writing Rule:</strong> Always leave a space between number and unit: <strong>{currentObj.lengthCm} cm</strong> (not {currentObj.lengthCm}cm).</span>
          </div>

          <button
            onClick={handleRecordMeasurement}
            className="record-data-btn"
            style={{ backgroundColor: currentObj.color }}
          >
            <Sparkles size={16} />
            <span>{isRecorded ? 'Update Table 5.2' : '+ Record in Table 5.2'}</span>
          </button>
        </div>
      </div>

      {/* Table 5.2 Live Status Card */}
      <div className="live-table-status-card">
        <div className="table-status-header">
          <strong className="status-title">Table 5.2: Measured Lengths of Objects</strong>
          <span className="progress-count">
            {Object.keys(recordedTable).length} / {LAB_OBJECTS.length} Objects Recorded
          </span>
        </div>

        <div className="mini-table-grid">
          {LAB_OBJECTS.map((obj) => {
            const entry = recordedTable[obj.id];
            return (
              <div key={obj.id} className={`mini-table-row ${entry ? 'recorded' : 'pending'}`}>
                <span className="row-icon">{obj.icon}</span>
                <span className="row-name">{obj.name}:</span>
                <span className="row-val">{entry ? entry.length : '—'}</span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
