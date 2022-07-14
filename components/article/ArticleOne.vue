<template>
    <div class="article-one">
        <article class="slpBlog__article">
            <h3 id="模糊测试的定义">模糊测试的定义</h3>
            <p>维基百科的定义是：“模糊（fuzzing）或模糊测试（fuzzing testing）是一种自动化的软件测试技术，通过向计算机程序输入无效的、非期望的、随机的数据，来观察程序是否发生了崩溃、内部断言故障或潜在的内存泄漏等问题“。</p>
            <p>演进到现在，模糊测试已经成为一种常用的应用程序安全测试，主要用来发现应用程序中的功能性缺陷、安全问题等。模糊测试已经被越来越的企业或组织所使用，CNCF 中的多个项目都在使用模糊测试，诸如 Argo，Envoy，Fluent-bit，Kubernetes 等，相应的模糊测试器也托管在 <a href="https://github.com/cncf/cncf-fuzzing">cncf-fuzzing Repo 中</a>。</p>
            <h3 id="模糊测试的历史">模糊测试的历史</h3>
            <p>“模糊”（fuzz）这个术语最初是由 Barton Miller 教授在上世纪 80 年代创造的。Miller 教授在一次风暴中，通过拨号上网来远程登录了一个 Unix 系统，整个过程中在拨号链路上有大量的干扰噪音，导致使用外部数据的应用程序发生了崩溃。Miller 教授顺势给他在威斯康星大学的学生设置了一个项目，题目叫做操作系统实用程序的可靠性（Operating System Utility Program Reliability）。在 Fuzz Generator 中，学生要开发一个命令行 fuzzer，通过用随机数据轰炸 Unix 程序并监测任何异常或崩溃，从而来测试 Unix 程序的可靠性。</p>
            <p>在模糊一词被创造之前，最早使用类似概念的是 1983 年 Steve Capps， 他开发了一个叫做“猴子”的应用程序。Steve 一直在编写一个工具，利用所谓的“Journaling Hook”方式，可以让电脑通过回放以前记录的动作来演示自己。这个软件被 Steve 重新利用来创造随机的鼠标点击和键盘输入，以测试 MacWrite 和 MacPaint 应用程序，在任何观察者看来，这就像一只看不见的猴子在无规律的使用电脑一样（这也是应用程序由此得名的原因）。</p>
            <p>从 Miller 教授的偶然发现到现在，模糊测试已经发展成为了一种备受推崇的技术，用于测试软件在收到意外或无效输入时的可靠性。模糊测试现在主要被用来进行软件的安全性测试，众多供应商都在宣传自己广泛的模糊测试工作，旨在提高软件的健壮性。</p>
            <h3 id="模糊测试的好处">模糊测试的好处</h3>
            <ul>
                <li>
                    <p><strong>保障应用安全</strong>：模糊测试是以“think like a hacker“的思路来实践的安全测试手段，能够发现常规检测方法难以发现的问题，诸如难以发现的“零日漏洞”（zero-day vulnerabilities）等，进一步保障了应用程序的安全。</p>
                </li>
                <li>
                    <p><strong>低成本高效率</strong>：一旦模糊测试器（fuzzer）运行起来以后，就可以在无需人为干预的情况下持续不断的对应用程序进行自动化的安全测试，而且能够尽早的发现安全问题，方便相关人员在软件开发的早期尽快解决安全问题，整体的修复成本会大大降低。</p>
                </li>
            </ul>
            <h3 id="极狐gitlab模糊测试">极狐GitLab模糊测试</h3>
            <p>
                模糊测试是极狐GitLabDevSecOps 功能中的其中一个安全功能，其他的安全功能有<strong>SAST、SCA、License 合规检测、密钥检测、容器镜像安全扫描、DAST、IAST</strong>。这些安全防护与保障能力能够覆盖软件生产全生命周期，助力用户快速打造高效、安全的 DevSecOps 体系。
            </p>
            <p>
                极狐GitLab模糊测试支持对 C/C++、Golang、Rust、Java、Python 等语言的应用程序进行模糊测试。下面演示用极狐GitLab模糊测试来发现 golang 代码中的 <code>index out of range</code> 问题。Demo 仓库地址为：<a href="https://jihulab.com/fuzzing-testing/fuzzing-testing-demo">https://jihulab.com/fuzzing-testing/fuzzing-testing-demo</a> 能够导致程序崩溃的代码示例如下：
            </p>
            <div class="highlight">
                <pre class="highlight go"><code><span class="k">package</span><span class="x"> </span><span class="n">parser</span><span class="x">

</span><span class="k">func</span><span class="x"> </span><span class="n">ParseComplex</span><span class="p">(</span><span class="n">data</span><span class="x"> </span><span class="p">[]</span><span class="x"> </span><span class="kt">byte</span><span class="p">)</span><span class="x"> </span><span class="kt">bool</span><span class="x"> </span><span class="p">{</span><span class="x">
	</span><span class="k">if</span><span class="x"> </span><span class="nb">len</span><span class="p">(</span><span class="n">data</span><span class="p">)</span><span class="x"> </span><span class="o">==</span><span class="x"> </span><span class="m">6</span><span class="x"> </span><span class="p">{</span><span class="x">
		</span><span class="k">if</span><span class="x"> </span><span class="n">data</span><span class="p">[</span><span class="m">0</span><span class="p">]</span><span class="x"> </span><span class="o">==</span><span class="x"> </span><span class="sc">'F'</span><span class="x"> </span><span class="o">&amp;&amp;</span><span class="x"> </span><span class="n">data</span><span class="p">[</span><span class="m">1</span><span class="p">]</span><span class="x"> </span><span class="o">==</span><span class="x"> </span><span class="sc">'U'</span><span class="x"> </span><span class="o">&amp;&amp;</span><span class="x"> </span><span class="n">data</span><span class="p">[</span><span class="m">2</span><span class="p">]</span><span class="x"> </span><span class="o">==</span><span class="x"> </span><span class="sc">'Z'</span><span class="x"> </span><span class="o">&amp;&amp;</span><span class="x"> </span><span class="n">data</span><span class="p">[</span><span class="m">3</span><span class="p">]</span><span class="x"> </span><span class="o">==</span><span class="x"> </span><span class="sc">'Z'</span><span class="x"> </span><span class="o">&amp;&amp;</span><span class="x"> </span><span class="n">data</span><span class="p">[</span><span class="m">4</span><span class="p">]</span><span class="x"> </span><span class="o">==</span><span class="x"> </span><span class="sc">'I'</span><span class="x"> </span><span class="o">&amp;&amp;</span><span class="x"> </span><span class="n">data</span><span class="p">[</span><span class="m">5</span><span class="p">]</span><span class="x"> </span><span class="o">==</span><span class="x"> </span><span class="sc">'N'</span><span class="x"> </span><span class="o">&amp;&amp;</span><span class="x"> </span><span class="n">data</span><span class="p">[</span><span class="m">6</span><span class="p">]</span><span class="x"> </span><span class="o">==</span><span class="x"> </span><span class="sc">'G'</span><span class="x"> </span><span class="p">{</span><span class="x">
			</span><span class="k">return</span><span class="x"> </span><span class="no">true</span><span class="x">
		</span><span class="p">}</span><span class="x">
	</span><span class="p">}</span><span class="x">
	</span><span class="k">return</span><span class="x"> </span><span class="no">false</span><span class="x">
</span><span class="p">}</span><span class="x">
</span></code>
                                </pre>
            </div>
            <p>实际的 <code>len(data)</code> 是 7，而不是 6，在实际运行过程中会导致程序崩溃（crash）。而极狐GitLab的模糊测试是能够检测出这个问题的，并且可以将检测集成到 CI/CD 中：</p>
            <div class="highlight">
                <pre class="highlight yaml"><code><span class="na">image</span><span class="pi">:</span> <span class="s">golang:1.18</span>

<span class="na">stages</span><span class="pi">:</span>
  <span class="pi">-</span> <span class="s">test</span>
  <span class="pi">-</span> <span class="s">fuzz</span>

<span class="na">format</span><span class="pi">:</span>
  <span class="na">stage</span><span class="pi">:</span> <span class="s">test</span>
  <span class="na">tags</span><span class="pi">:</span>
    <span class="pi">-</span> <span class="s">fuzzing</span>
  <span class="na">script</span><span class="pi">:</span>
    <span class="pi">-</span> <span class="s">go fmt</span>
    <span class="pi">-</span> <span class="s">go vet</span>
    <span class="pi">-</span> <span class="s">go test -race ./...</span>

<span class="na">include</span><span class="pi">:</span>
  <span class="pi">-</span> <span class="na">template</span><span class="pi">:</span> <span class="s">Coverage-Fuzzing.gitlab-ci.yml</span>
  <span class="pi">-</span> <span class="na">template</span><span class="pi">:</span> <span class="s">SAST.gitlab-ci.yml</span>

<span class="na">my_fuzz_target</span><span class="pi">:</span>
    <span class="na">extends</span><span class="pi">:</span> <span class="s">.fuzz_base</span>
    <span class="na">image</span><span class="pi">:</span> <span class="s">golang:latest</span>
    <span class="na">tags</span><span class="pi">:</span>
      <span class="pi">-</span> <span class="s">fuzzing</span>
    <span class="na">variables</span><span class="pi">:</span>
      <span class="na">COVFUZZ_SEED_CORPUS</span><span class="pi">:</span> <span class="s1">'</span><span class="s">./seed_corpus'</span>
    <span class="na">script</span><span class="pi">:</span>
        <span class="pi">-</span> <span class="s">apt update &amp;&amp; apt install -y clang</span>
        <span class="pi">-</span> <span class="s">go get -u github.com/dvyukov/go-fuzz/go-fuzz github.com/dvyukov/go-fuzz/go-fuzz-build</span>
        <span class="pi">-</span> <span class="s">go install -v github.com/dvyukov/go-fuzz/go-fuzz github.com/dvyukov/go-fuzz/go-fuzz-build</span>
        <span class="pi">-</span> <span class="s">go-fuzz-build -libfuzzer -o my_fuzz_target.a .</span>
        <span class="pi">-</span> <span class="s">clang -fsanitize=fuzzer my_fuzz_target.a -o my_fuzz_target</span>
        <span class="pi">-</span> <span class="s">./gitlab-cov-fuzz run --regression=$REGRESSION -- ./my_fuzz_target || </span><span class="no">true</span>
</code>
                                </pre>
            </div>
            <p>当通过 MR 的方式提交代码的时候，会自动触发模糊测试，测试结果会在 MR 中展示：</p>
            <div style="text-align: center">
                <img
                    src="https://gitlab.cn/images/blogimages/2022/06/fuzzing-testing/2.png"
                    alt="fuzzing-report"
                >
            </div>
            <p>
                可以看到在
                <code>Coverage Fuzzing</code>
                检测中有一个潜在的漏洞，级别是
                <strong>低</strong>，原因是
                <code>index-out-of-range</code>
                。可以通过点击漏洞来查看详情：
            </p>
            <div style="text-align: center">
                <img
                    src="https://gitlab.cn/images/blogimages/2022/06/fuzzing-testing/3.png"
                    alt="fuzzing-issue-creation"
                >
            </div>
            <p>并通过新建 issue 的方式来对安全漏洞进行管理。在安全问题修复以后（例如将 len(data) == 6 改成 len(data) == 7），会再次触发模糊测试，在确认没有问题之后，就可以让 approver 进行代码合并了：</p>
            <div style="text-align: center">
                <img
                    src="https://gitlab.cn/images/blogimages/2022/06/fuzzing-testing/4.png"
                    alt="fuzzing-fix"
                >
            </div>
            <p>
                当然，对于极狐GitLab来讲，所有的安全漏洞都会在同一个的面板上进行展示（可以通过
                <strong>安全与合规——漏洞报告</strong>来查看）：
            </p>
            <div style="text-align: center">
                <img
                    src="https://gitlab.cn/images/blogimages/2022/06/fuzzing-testing/5.png"
                    alt="security-dashboard"
                >
            </div>
            <p>在面板上通过工具选项，就能够找到用模糊测试（Coverage fuzzing）扫描出的安全漏洞，并且在下面会呈现详细信息。统一的面板展示能够做到安全信息的公开和透明，有助于不同团队通过协作来一起完成安全问题的修复。</p>
            <p>以上整个流程演示了利用极狐GitLab模糊测试来完成基于代码覆盖率（Coverage）的模糊测试，并且利用极狐GitLab的代码审核、CI/CD、Issue 等功能完成了代码安全扫描——漏洞追踪管理——漏洞修复的安全漏洞闭环管理。</p>
        </article>
    </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';

@Component
export default class ArticleOne extends Vue {
}
</script>

<style lang="scss">
@import '@/assets/styles/developer/articleOne.scss';
</style>
