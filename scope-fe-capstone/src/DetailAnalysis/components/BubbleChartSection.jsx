import React, { useState, useEffect } from "react";
import "../css/BubbleChartSection.css";
import DOMPurify from "dompurify";

const getMaxValue = (topics) => {
    return Math.max(...topics.map((t) => t.value));
};

const calculateSize = (value, maxValue) => {
    const minSize = 100;
    const maxSize = 230;
    if (value <= 2) return minSize;
    return minSize + ((value - 2) / (maxValue - 2)) * (maxSize - minSize);
};

const BubbleChartSection = ({ title, data = [], colorMap = {} }) => {
    const [selectedTopic, setSelectedTopic] = useState(null);

    const maxValue = getMaxValue(data || []);
    const centerTopic = (data || []).find((t) => t.value === maxValue);
    const otherTopics = (data || []).filter((t) => t.value !== maxValue && t.value > 0); //0이면 원이 안그려짐짐

    return (
        <div className="bubble-chart-container">
            <div className="bubble-chart">
                {/* 가운데 원 */}
                <div
                    className="bubble center"
                    style={{
                        width: 230,
                        height: 230,
                        backgroundColor: colorMap[centerTopic.name] || colorMap.default || "#ccc"
                    }}
                    onClick={() => setSelectedTopic(centerTopic)}
                >
                    <div className="bubble-content" style={{ fontSize: "24px" }}>
                        <div>{centerTopic.name}</div>
                        <div>{centerTopic.value}%</div>
                    </div>
                </div>


                {/* 주변 원들 */}
                {otherTopics.map((topic, i) => {
                    const size = calculateSize(topic.value, maxValue);
                    const angle = (i / otherTopics.length) * 2 * Math.PI;
                    const radius = 220; // 중심으로부터 거리
                    const x = Math.cos(angle) * radius;
                    const y = Math.sin(angle) * radius;

                    return (
                        <div
                            key={i}
                            className="bubble"
                            style={{
                                width: size,
                                height: size,
                                transform: `translate(${x}px, ${y}px)`,
                                backgroundColor: colorMap[topic.name] || colorMap.default || "#ccc"
                            }}
                            onClick={() => setSelectedTopic(topic)}
                        >
                            <div className="bubble-content">
                                <div>{topic.name}</div>
                                <div>{topic.value}%</div>
                            </div>
                        </div>
                    );
                })}
            </div>

            {selectedTopic && (
                <div className="bubble-comments">
                    <p className="bubble-comments-title">🗨️ {selectedTopic.name}에 대한 댓글</p>
                    <hr></hr>
                    <div className="bubble-comments-scroll">
                        <ul>
                            {selectedTopic.comments.slice(0, 5).map((comment, i) => (
                                <li
                                    key={i}
                                    style={{ marginBottom: "20px" }}
                                    dangerouslySetInnerHTML={{
                                        __html: DOMPurify.sanitize(comment),
                                    }}
                                />
                            ))}
                        </ul>
                    </div>
                </div>
            )}
        </div>
    );
};

export default BubbleChartSection;
