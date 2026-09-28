# 实机 QA

日期：2026-09-28。浏览器：Chrome 154.0.8037.57；GPU：ANGLE / AMD Radeon(TM) Graphics (0x00001638) / Direct3D11；视口：1920 × 1080，DPR 1。

逻辑验证：7 项 Node 测试全部通过，覆盖路网连续性、三车型动力学、薄障碍防穿透、检查点顺序、反向与漏点、圈数与超时、电脑车双路线完赛、收集去重、奖励门槛和损坏存档。

浏览器验证：启动、5 种模式按钮、3 种车辆、暂停、环境切换冻结计时、画质切换、失焦暂停、窗口缩放、无资源错误全部通过。浏览器报告见 `../work/summer-run/browser.json`（交付目录中保留摘要）。

中画质、1920×1080 实机采样：原图观景点 47 FPS，售货机 48 FPS，林间山道 74 FPS，山顶观景台 51 FPS，黄昏海岸 64 FPS，夜间住宅街 48 FPS。低画质浏览器流程结束时为 1440×810、51 FPS。动态阴影、植被和程序化几何是主要开销；已将重复静态几何合并、减少叶片数量、限制夜间动态灯数量和远景细节。

视觉检查截图：

- `screenshots/reference-day.png`
- `screenshots/vending-close.png`
- `screenshots/forest.png`
- `screenshots/overlook.png`
- `screenshots/coast-sunset.png`
- `screenshots/residential-night.png`

仍需后续精修：远景住宅密度和个别程序化树叶轮廓可继续提高；暂未在真实低端笔记本上测量。最终道路采样的车身碰撞探针为 0 个阻塞点。原版目录没有修改。
