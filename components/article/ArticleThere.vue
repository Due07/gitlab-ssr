<template>
    <div class="article-there">
        <div class="cooked">
            <h2>
                <a
                    name="h-1"
                    class="anchor"
                    href="#h-1"
                ></a>测试背景
            </h2>
            <p>GitLab是一款在全球范围内都非常流行的源代码管理工具，早期的版本当中用户可以选择使用MySQL或PostgreSQL两种数据库，但是从12.1.0版本开始官方就完全放弃了对MySQL的支持。GitLab新版本中很多功能都基于PostgreSQL的特性开发，它是众多使用了PostgreSQL作为底层数据存储的标杆产品。</p>
            <p>我们试想一下这种用户场景，某大型集团分为众多事业部，每个事业部甚至小团队可能都维护了自己的GitLab，从集团层面如何管理这些仓库就成了棘手的问题。比如：</p>
            <ul>
                <li>版本问题（开源版和商业版，高版本和低版本）</li>
                <li>精细化权限控制</li>
                <li>数据备份</li>
                <li>基础设施利用率</li>
            </ul>
            <p>如果能有一套统一的GitLab环境，同时又具备良好的可扩展性和高可用性，那无疑是最好的解决方案。但是传统单机PostgreSQL数据库并不能满足以上需求，那能否考虑把GitLab跑在分布式数据库上？</p>
            <p>CockroachDB和YugabyteDB是目前比较知名的实现了PG协议的新型开源分布式数据库，本系列测评文章用于对比这两款数据库对GitLab的支持程度如何，一定程度上能反映出对标准PostgreSQL的兼容情况。</p>
            <p>在上一篇《系统初始化》中我们得出的结论是，CockroachDB无法通过GitLab的setup程序自动创建数据库schema导致无法启动，而YugabyteDB在初始化这个步骤一切正常可以正常启动GitLab。</p>
            <p>本次测试我们先把一个标准的GitLab库以及铺底数据分别导入到这两个数据库中，看能否正常启动GitLab，再选一部分GitLab的核心业务场景来做对比测试，看看两者的兼容情况如何。</p>
            <h2>
                <a
                    name="h-2"
                    class="anchor"
                    href="#h-2"
                ></a>测试环境
            </h2>
            <ul>
                <li>CockroachDB</li>
            </ul>
            <pre><code class="hljs markdown">defaultdb=# select version();
<span class="hljs-section">                                      version
------------------------------------------------------------------------------------</span>
 CockroachDB CCL v22.1.0 (x86<span class="hljs-emphasis">_64-pc-linux-gnu, built 2022/05/23 16:27:47, go1.17.6)
(1 row)
</span></code></pre>
            <ul>
                <li>YugabyteDB</li>
            </ul>
            <pre><code class="hljs csharp">gitlab=<span class="hljs-meta"># select version();</span>
                                                                                         version
-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
 PostgreSQL <span class="hljs-number">11.2</span>-YB<span class="hljs-number">-2.13</span><span class="hljs-number">.2</span><span class="hljs-number">.0</span>-b0 <span class="hljs-keyword">on</span> x86_64-pc-linux-gnu, compiled <span class="hljs-keyword">by</span> clang version <span class="hljs-number">12.0</span><span class="hljs-number">.1</span> (https:<span class="hljs-comment">//github.com/yugabyte/llvm-project.git bdb147e675d8c87cee72cc1f87c4b82855977d94), 64-bit</span>
(<span class="hljs-number">1</span> row)
</code></pre>
            <ul>
                <li>GitLab</li>
            </ul>
            <pre><code class="hljs apache"><span class="hljs-attribute">GitLab</span> information
<span class="hljs-attribute">Version</span>:        <span class="hljs-number">12</span>.<span class="hljs-number">1</span>.<span class="hljs-number">0</span>-ee
<span class="hljs-attribute">Revision</span>:       <span class="hljs-number">1</span>f<span class="hljs-number">2</span>e<span class="hljs-number">6</span>f<span class="hljs-number">3</span>f<span class="hljs-number">6</span>d<span class="hljs-number">8</span>
<span class="hljs-attribute">Directory</span>:      /home/git/gitlab
<span class="hljs-attribute">DB</span> Adapter:     PostgreSQL
</code></pre>
            <h2>
                <a
                    name="h-3"
                    class="anchor"
                    href="#h-3"
                ></a>测试场景
            </h2>
            <div class="md-table">
                <table>
                    <thead>
                        <tr>
                            <th>Scene Type</th>
                            <th>Scene name</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>read (9)</td>
                            <td>- Project List <br>- Project View <br>- Repository View <br>- Branch List <br>- Issue List <br>- Issue View <br>- Merge Request List <br>- Merge Request View <br>- Project Members</td>
                        </tr>
                        <tr>
                            <td>write (8)</td>
                            <td>- New Project <br>- GitLab Import <br>- New Commit <br>- Create Branch <br>- Create Issue <br>- Create Merge Request <br>- PR Merge <br>- Add Project Member</td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <h2>
                <a
                    name="h-4"
                    class="anchor"
                    href="#h-4"
                ></a>测试过程
            </h2>
            <p>简单起见，我们直接使用pg_dump来做数据迁移。</p>
            <p>先从标准库中把schema和数据导出到sql文件中：</p>
            <pre><code class="hljs nginx"><span class="hljs-attribute">pg_dump</span> --host <span class="hljs-number">10.3.70.132</span> --port <span class="hljs-number">32298</span> --user postgres --<span class="hljs-literal">no</span>-owner -W gitlabhq_production &gt; /root/gitlabhq_production.sql

</code></pre>
            <h3>
                <a
                    name="h-1cockroachdb-5"
                    class="anchor"
                    href="#h-1cockroachdb-5"
                ></a>1、CockroachDB数据迁移
            </h3>
            <p>这里用psql客户端把备份出来的sql导入，如果执行过程中出现错误会自动跳过，并把错误信息打印出来：</p>
            <pre><code class="hljs apache"><span class="hljs-attribute">psql</span> --host <span class="hljs-number">10.3.70.189</span> --port <span class="hljs-number">26258</span> --user root gitlab -f /root/gitlabhq_production.sql &gt; pg_import_crdb.log
</code></pre>
            <p>从输出的错误信息中观察主要包含以下两类：</p>
            <pre><code class="hljs kotlin">描述:  source SQL:
CREATE EXTENSION IF NOT EXISTS pg_trgm WITH SCHEMA <span class="hljs-keyword">public</span>
                                            ^
提示:  You have attempted to use a feature that <span class="hljs-keyword">is</span> not yet implemented.
See: https:<span class="hljs-comment">//go.crdb.dev/issue-v/74777/v22.1</span>
psql:/root/gitlabhq_production.sql:<span class="hljs-number">30</span>: ERROR:  at or near <span class="hljs-string">"pg_trgm"</span>: syntax error: unimplemented: <span class="hljs-keyword">this</span> syntax
描述:  source SQL:
COMMENT ON EXTENSION pg_trgm IS <span class="hljs-string">'text similarity measurement and index searching based on trigrams'</span>
</code></pre>
            <p>以上报错还是说extension不兼容的问题。</p>
            <pre><code class="hljs kotlin">提示:  You have attempted to use a feature that <span class="hljs-keyword">is</span> not yet implemented.
See: https:<span class="hljs-comment">//go.crdb.dev/issue-v/47420/v22.1</span>
psql:/root/gitlabhq_production.sql:<span class="hljs-number">31396</span>: ERROR:  at or near <span class="hljs-string">"."</span>: syntax error: unimplemented: <span class="hljs-keyword">this</span> syntax
描述:  source SQL:
CREATE INDEX index_issues_on_description_trigram ON <span class="hljs-keyword">public</span>.issues USING gin (description <span class="hljs-keyword">public</span>.gin_trgm_ops)
</code></pre>
            <p>这个报错是由于CockroachDB还不支持operator class。不过这两个报错都是和索引相关，预计不会对DML操作有太大影响，暂时先忽略。</p>
            <p>看一下sql文件导入完成后数据库的情况：</p>
            <pre><code class="hljs sql">gitlab<span class="hljs-operator">=</span># <span class="hljs-keyword">select</span> C.relkind,<span class="hljs-built_in">count</span>(C.relname) <span class="hljs-keyword">from</span> pg_class C <span class="hljs-keyword">left</span> <span class="hljs-keyword">join</span> pg_namespace n <span class="hljs-keyword">on</span> n.oid <span class="hljs-operator">=</span> C.relnamespace <span class="hljs-keyword">where</span> n.nspname <span class="hljs-operator">=</span> <span class="hljs-string">'public'</span> <span class="hljs-keyword">group</span> <span class="hljs-keyword">by</span> C.relkind;
 relkind <span class="hljs-operator">|</span> count
<span class="hljs-comment">---------+-------</span>
 r       <span class="hljs-operator">|</span>   <span class="hljs-number">249</span>
 i       <span class="hljs-operator">|</span>   <span class="hljs-number">890</span>
 S       <span class="hljs-operator">|</span>   <span class="hljs-number">231</span>
(<span class="hljs-number">3</span> <span class="hljs-keyword">rows</span>)
</code></pre>
            <p>除了差10个左右索引，其他都正常。这时候把GitLab数据库指向到这个新库，启动程序看能否打开页面：</p>
            <pre><code class="hljs apache"><span class="hljs-attribute">sudo</span> -u git -H editor config/database.yml
<span class="hljs-attribute">sudo</span> /etc/init.d/gitlab restart


<span class="hljs-attribute">source</span>=rack-timeout id=oMeadFm<span class="hljs-number">1</span>kN<span class="hljs-number">1</span> timeout=<span class="hljs-number">60000</span>ms state=ready
<span class="hljs-attribute">Started</span> GET <span class="hljs-string">"/users/sign_in"</span> for <span class="hljs-number">10.3.74.126</span> at <span class="hljs-number">2022</span>-<span class="hljs-number">05</span>-<span class="hljs-number">31</span> <span class="hljs-number">16</span>:<span class="hljs-number">19</span>:<span class="hljs-number">18</span> +<span class="hljs-number">0800</span>
<span class="hljs-attribute">Processing</span> by SessionsController#new as HTML
<span class="hljs-attribute">Completed</span> <span class="hljs-number">200</span> OK in <span class="hljs-number">55</span>ms (Views: <span class="hljs-number">32</span>.<span class="hljs-number">3</span>ms | ActiveRecord: <span class="hljs-number">9</span>.<span class="hljs-number">7</span>ms | Elasticsearch: <span class="hljs-number">0</span>.<span class="hljs-number">0</span>ms)
<span class="hljs-attribute">source</span>=rack-timeout id=oMeadFm<span class="hljs-number">1</span>kN<span class="hljs-number">1</span> timeout=<span class="hljs-number">60000</span>ms service=<span class="hljs-number">291</span>ms state=completed
</code></pre>
            <p>从日志来看正常跳转到登录页面无报错。再使用已有的用户看能否登录成功：</p>
            <h3>
                <a
                    name="h-2yugabytedb-6"
                    class="anchor"
                    href="#h-2yugabytedb-6"
                ></a>2、YugabyteDB数据库迁移
            </h3>
            <p>用前面同样的方法把sql文件导入到YugabyteDB中：</p>
            <pre><code class="hljs apache"><span class="hljs-attribute">psql</span> --host <span class="hljs-number">10.3.70.189</span> --port <span class="hljs-number">5434</span> --user postgres gitlab -f /root/gitlabhq_production.sql &gt; pg_import_ygdb.log

</code></pre>
            <p>大约执行了1个多小时，整个过程没报错，检查一下数据库对象：</p>
            <pre><code class="hljs sql">gitlab<span class="hljs-operator">=</span># <span class="hljs-keyword">select</span> C.relkind,<span class="hljs-built_in">count</span>(C.relname) <span class="hljs-keyword">from</span> pg_class C <span class="hljs-keyword">left</span> <span class="hljs-keyword">join</span> pg_namespace n <span class="hljs-keyword">on</span> n.oid <span class="hljs-operator">=</span> C.relnamespace <span class="hljs-keyword">where</span> n.nspname <span class="hljs-operator">=</span> <span class="hljs-string">'public'</span> <span class="hljs-keyword">group</span> <span class="hljs-keyword">by</span> C.relkind;
 relkind <span class="hljs-operator">|</span> count
<span class="hljs-comment">---------+-------</span>
 S       <span class="hljs-operator">|</span>   <span class="hljs-number">231</span>
 i       <span class="hljs-operator">|</span>   <span class="hljs-number">903</span>
 r       <span class="hljs-operator">|</span>   <span class="hljs-number">249</span>
(<span class="hljs-number">3</span> <span class="hljs-keyword">rows</span>)
</code></pre>
            <p>与标准库一致。</p>
            <p>修改数据库连接重启GitLab，再尝试打开页面登录已有用户，发现登录成功并跳转到首页。</p>
            <h3>
                <a
                    name="h-3-7"
                    class="anchor"
                    href="#h-3-7"
                ></a>3、场景对比
            </h3>
            <div class="md-table">
                <table>
                    <thead>
                        <tr>
                            <th>场景名称</th>
                            <th>CockroachDB</th>
                            <th>YugabyteDB</th>
                            <th>对比结果</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>Project List</td>
                            <td>访问页面正常，日志无报错信息。参考登录成功后的跳转效果。</td>
                            <td>访问页面正常，日志无报错信息。参考登录成功后的跳转效果。</td>
                            <td>两者都支持</td>
                        </tr>
                        <tr>
                            <td>Project View</td>
                            <td></td>
                            <td></td>
                            <td>两者都支持</td>
                        </tr>
                        <tr>
                            <td>Repository View</td>
                            <td></td>
                            <td></td>
                            <td>两者都支持</td>
                        </tr>
                        <tr>
                            <td>Branch List</td>
                            <td></td>
                            <td></td>
                            <td>两者都支持</td>
                        </tr>
                        <tr>
                            <td>Issue List</td>
                            <td></td>
                            <td></td>
                            <td>两者都支持</td>
                        </tr>
                        <tr>
                            <td>Issue View</td>
                            <td></td>
                            <td></td>
                            <td>两者都支持</td>
                        </tr>
                        <tr>
                            <td>Merge Request List</td>
                            <td></td>
                            <td></td>
                            <td>两者都支持</td>
                        </tr>
                        <tr>
                            <td>Merge Request View</td>
                            <td></td>
                            <td></td>
                            <td>两者都支持</td>
                        </tr>
                        <tr>
                            <td>Project Members</td>
                            <td></td>
                            <td></td>
                            <td>两者都支持</td>
                        </tr>
                        <tr>
                            <td>New Project</td>
                            <td></td>
                            <td></td>
                            <td>CockroachDB：进入到创建项目页面返回500异常，日志报错信息。“ActionView::Template::Error (PG::UndefinedColumn: ERROR: column “namespaces.rowid” does not exist”。YugabyteDB：提交导入请求后持续加载中，观察日志无报错，一段时间后跳转到创建好的项目页面。</td>
                        </tr>
                        <tr>
                            <td>GitLab Import</td>
                            <td></td>
                            <td></td>
                            <td>CockroachDB：不能进去到新建项目页面，无法导入项目。YugabyteDB：提交导入请求后持续加载中，观察日志无报错。怀疑是gitlab权限问题，改用root用户重启gitlab程序后导入成功。</td>
                        </tr>
                        <tr>
                            <td>New Commit</td>
                            <td></td>
                            <td></td>
                            <td>两者都支持</td>
                        </tr>
                        <tr>
                            <td>Create Branch</td>
                            <td></td>
                            <td></td>
                            <td>两者都支持</td>
                        </tr>
                        <tr>
                            <td>Create Issue</td>
                            <td></td>
                            <td></td>
                            <td>两者都支持</td>
                        </tr>
                        <tr>
                            <td>Create Merge Request</td>
                            <td></td>
                            <td></td>
                            <td>两者都支持</td>
                        </tr>
                        <tr>
                            <td>PR Merge</td>
                            <td></td>
                            <td></td>
                            <td>CockroachDB和YugabyteDB出现相同的情况：提交Merge请求后持续加载中，一段时间后页面出现报错提示，无法再次提交merge，日志无异常。</td>
                        </tr>
                        <tr>
                            <td>Add Project Member</td>
                            <td></td>
                            <td></td>
                            <td>两者都支持</td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <h2>
                <a
                    name="h-8"
                    class="anchor"
                    href="#h-8"
                ></a>测试结论
            </h2>
            <p>1、CockroachDB在所有测试的场景中3个最终失败，分别是新建项目、导入已有GitLab项目、PR Merge。</p>
            <p>2、YugabyteDB在所有测试场景中有1个最终失败，即PR Merge。</p>
            <p>从本次测试结果来看，YugabyteDB对GitLab兼容性要好一些，关于PR Merge报错是否和数据库有关还需要进一步排查。</p>
            <h2>
                <a
                    name="h-9"
                    class="anchor"
                    href="#h-9"
                ></a>下一步计划
            </h2>
            <p>接下来会根据本次测试发现的问题进行分析定位，再尝试最小化改造Gitlab源码看能否兼容测试失败的场景。</p>
        </div>
    </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';

@Component
export default class ArticleThere extends Vue {
}
</script>

<style lang="scss">
@import '@/assets/styles/developer/articleThere.scss';
</style>
