// src/assets/js/script.js

import { gsap } from 'gsap';
// 如果使用了 ScrollTrigger，也需要导入和注册

console.log("script.js loaded and ready for faster animations!");

document.addEventListener('DOMContentLoaded', () => {

    console.log("DOM fully loaded. Starting faster GSAP animations.");

    // --- 页面加载入场动画时间线 (调整 duration 和 delay) ---
    const masterTimeline = gsap.timeline({
        defaults: { duration: 0.8, ease: "power2.out" }, // 默认 duration 减小到 0.8s，缓动函数也可以调整
        delay: 0.2 // 整体延迟减小到 0.2s
    });

    // 头部标题和副标题动画
    masterTimeline.from("header h1", {
        opacity: 0,
        y: -50, // 减少初始位移
        duration: 1 // 标题可以稍微长一点，但也不要超过 1s
    })
    .from("header .subtitle", {
        opacity: 0,
        y: -30 // 减少初始位移
    }, "<0.3") // 保持相对延迟，但因为上一个动画duration减小，实际开始时间提前

    // CTA 按钮放大弹出动画
    .from(".cta-button", {
        opacity: 0,
        scale: 0.5, // 从缩小状态开始
        ease: "back.out(1.5)", // 弹性缓动系数可以微调
        duration: 1 // 持续时间缩短
    }, "<0.4") // 相对延迟缩短

    // 导航栏整体动画
    .from("nav", {
        opacity: 0,
        y: -40, // 减少初始位移
        duration: 1,
        ease: "power2.out"
    }, "<0.5"); // 相对延迟缩短


    // --- Section 内容入场动画 ---
    // 在主时间线结束后，让页面主要内容 Section 依次出现
    // 延迟时间基于主时间线的总时长
    // 注意：masterTimeline.endTime() 会根据修改后的 duration 和 delay 自动计算
    const sectionEntryDelay = masterTimeline.endTime() + 0.4; // Section 开始的延迟减小到 0.4s

    // 关于本站 Section 动画 (从下方淡入滑入)
    gsap.from(".about-section", {
        opacity: 0,
        y: 60, // 减少初始位移
        duration: 1, // 持续时间缩短
        ease: "power2.out",
        delay: sectionEntryDelay // 使用计算出的延迟
    });

    // 最新攻略 Section 标题动画 (从左侧淡入)
    gsap.from(".latest-guides-section h2", {
        opacity: 0,
        x: -60, // 减少初始位移
        duration: 0.8, // 持续时间缩短
        ease: "power2.out",
        delay: sectionEntryDelay + 0.3 // 在关于本站 Section 后延迟 0.3s
    });

    // 最新攻略列表项的渐进动画 (从下方渐进淡入)
    gsap.from(".guide-list li", {
        opacity: 0,
        y: 20, // 减少初始位移
        duration: 0.6, // 持续时间缩短
        ease: "power2.out",
        stagger: 0.1, // 列表项之间的延迟减小到 0.1s
        delay: sectionEntryDelay + 0.6 // 在最新攻略标题后延迟 0.3s
    });


    // --- 创意动画效果 (调整时长，保持微妙感) ---

    // 1. 头部背景的微妙平移动画 (保持长时间，但可能调整缓动或范围)
    gsap.to("header", {
        backgroundPosition: "100% 50%",
        duration: 25, // 持续时间稍微缩短，或保持长
        ease: "none",
        repeat: -1,
        yoyo: true
    });

    // 2. 鼠标悬停在导航链接上的微动画 (保持快速响应)
    document.querySelectorAll('nav a').forEach(link => {
        link.addEventListener('mouseenter', () => {
            gsap.to(link, { y: -3, duration: 0.15, ease: "power1.out" }); // 持续时间缩短
        });
        link.addEventListener('mouseleave', () => {
            gsap.to(link, { y: 0, duration: 0.25, ease: "power1.out" }); // 持续时间缩短
        });
    });

    // 3. CTA 按钮的 Subtle 无限脉冲动画 (调整时长和延迟)
     gsap.to(".cta-button", {
         scale: 1.02,
         duration: 0.6, // 脉冲速度加快
         ease: "sine.inOut",
         repeat: -1,
         yoyo: true,
         delay: masterTimeline.endTime() + 1 // 在所有入场动画都完成后延迟 1s 再开始脉冲
     });

    // 4. Section 标题颜色和位移的悬停动画 (保持快速响应)
    document.querySelectorAll('main section h2').forEach(title => {
         title.addEventListener('mouseenter', () => {
             gsap.to(title, { color: "var(--link-hover-color)", x: 8, duration: 0.25, ease: "back.out(1.8)" }); // 持续时间缩短，位移稍微减小
         });
         title.addEventListener('mouseleave', () => {
             gsap.to(title, { color: "var(--secondary-color)", x: 0, duration: 0.35, ease: "power2.out" }); // 持续时间缩短
         });
    });

});