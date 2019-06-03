//设置变量，来存储分数。
var E = 0;
var I = 0;
var S = 0;
var N = 0;
var T = 0;
var F = 0;
var J = 0;
var P = 0;
var data = [
    {
        select: "1．当你遇到新朋友时，你",
        A: "A．说话的时间与聆听的时间相当。",
        B: "B．聆听的时间会比说话的时间多。",
        type: "EI",
    }, {
        select: "2．下列哪一种是你的一般生活取向？",
        A: "A．只管做吧。",
        B: "B．找出多种不同选择。",
        type: "SN",
    }, {
        select: "3．你喜欢自己的哪种性格？",
        A: "A．冷静而理性。",
        B: "B．热情而体谅。",
        type: "TF",
    }, {
        select: "4．你擅长",
        A: "A．在有需要时间时同时协调进行多项工作。",
        B: "B．专注在某一项工作上，直至把它完成为止。",
        type: "JP",
    }, {
        select: "5．你参与社交聚会时",
        A: "A．总是能认识新朋友。",
        B: "B．只跟几个亲密挚友呆在一起。",
        type: "EI",
    }, {
        select: "6．当你尝试了解某些事情时，一般你会",
        A: "A．先要了解细节。",
        B: "B．先了解整体情况，细节容后再谈。",
        type: "SN",
    }, {
        select: "7．你对下列哪方面较感兴趣？",
        A: "A．知道别人的想法。",
        B: "B．知道别人的感受。",
        type: "TF",
    }, {
        select: "8．你较喜欢下列哪个工作？",
        A: "A．能让你迅速和即时做出反应。",
        B: "B．能让你定出目标，然后逐步达成目标的工作。",
        type: "JP",
    }, {
        select: "9,下列哪一种说法较适合你？",
        A: "A．当我与友人尽兴后，我会感到精力充沛，并会继续追求这种欢娱。",
        B: "B．当我与友人尽兴后，我会感到疲累，觉得需要一些空间。",
        type: "EI",
    }, {
        select: "10,下列哪一种说法较适合你？",
        A: "A．我较有兴趣知道别人的经历，例如他们做过什么？认识什么人？。",
        B: "B．我较有兴趣知道别人的计划和梦想，例如他们会往哪里去？憧憬什么？。",
        type: "SN",
    }, {
        select: "11,下列哪一种说法较适合你？",
        A: "A．我擅长订出一些可行的计划。",
        B: "B．我擅长促成别人同意一些计划，并衷力合作。",
        type: "TF",
    },
    {
        select: "12,下列哪一种说法较适合你？",
        A: "A．我会突然尝试做某些事，看看会有什么事情发生。",
        B: "B．我尝试做任何事前，都想事先知道可能有什么事情发生。",
        type: "JP",
    },
    {
        select: "13,下列哪一种说法较适合你？",
        A: "A．我经常边说话，边思考。",
        B: "B．我在说话前，通常会思考要说的话。",
        type: "EI",
    },
    {
        select: "14,下列哪一种说法较适合你？",
        A: "A．四周的实际环境对我很重要，而且会影响我的感受。",
        B: "B．如果我喜欢所做的事情，气氛对我而言并不是那么重要。",
        type: "SN",
    },
    {
        select: "15,下列哪一种说法较适合你？",
        A: "A．我喜欢分析，心思缜密。",
        B: "B．我对人感兴趣，关心他们所发生的事。",
        type: "TF",
    },
    {
        select: "16,下列哪一种说法较适合你？",
        A: "A．即使已出计划，我也喜欢探讨其他新的方案。",
        B: "B．一旦定出计划，我便希望能依计行事。",
        type: "JP",
    },
    {
        select: "17,下列哪一种说法较适合你？",
        A: "A．认识我的人，一般都知道什么对我来说是重要的。",
        B: "B．除了我感觉亲近的人，我不会对人说出什么对我来说是重要的。",
        type: "EI",

    },
    {
        select: "18,下列哪一种说法较适合你？",
        A: "A．如果我喜欢某种活动，我会经常进行这种活动。",
        B: "B．我一旦熟悉某种活动后，便希望转而尝试其它新的活动。",
        type: "SN",
    },
    {
        select: "19,下列哪一种说法较适合你？",
        A: "A．当我作决定的时候，我更多地考虑正反两面的观点，并且会推理与质证。",
        B: "B．当我作决定的时候，我会更多地了解其他人的想法，并希望能够达成共识。",
        type: "TF",
    },
    {
        select: "20,下列哪一种说法较适合你？",
        A: "A．当我专注做某件事情时，需要不时停下来休息。",
        B: "B．当我专注做某件事情时，不希望受到任何干扰。",
        type: "JP",
    },
    {
        select: "21,下列哪一种说法较适合你？",
        A: "A．我独处太久，便会感到不安。",
        B: "B．若没有足够的自处时间，我便会感到烦躁不安。",
        type: "EI",
    },
    {
        select: "22,下列哪一种说法较适合你？",
        A: "A,我对一些没有实际用途的意念不感兴趣。",
        B: "B．我喜欢意念本身，并享受想象意念的过程。",
        type: "SN",
    }, {
        select: "23,下列哪一种说法较适合你？",
        A: "A．当进行谈判时，我依靠自己的知识和技巧。",
        B: "B．当进行谈判时，我会拉拢其他人至同一阵线。",
        type: "TF",
    },
    {
        select: "24,当你放假时，你多数会？",
        A: "A．随遇而安，做当时想做的事。",
        B: "B．为想做的事情订出时间表。",
        type: "JP",
    },
    {
        select: "25,当你放假时，你多数会？",
        A: "A．花多些时间与别人共度。",
        B: "B．花多些时间自己阅读、散步或者发白日梦。",
        type: "EI",
    },
    {
        select: "26,当你放假时，你多数会？",
        A: "A．返回你喜欢的地方度假。",
        B: "B．选择前往一些你从未到达的地方。",
        type: "SN",
    },
    {
        select: "27,当你放假时，你多数会？",
        A: "A．带着一些与工作或学校有关的事情。",
        B: "B．处理一些对你重要的人际关系。",
        type: "TF",
    }, {
        select: "28,当你放假时，你多数会？",
        A: "A．忘记平时发生的事情，专心享乐。",
        B: "B．想着假期过后要准备的事情。",
        type: "JP",
    },
    {
        select: "29,当你放假时，你多数会？",
        A: "A．参观著名景点。",
        B: "B．花时间逛博物馆和一些较为幽静的地方。",
        type: "EI",
    },
    {
        select: "30,当你放假时，你多数会？",
        A: "A．在喜欢的餐厅用膳。",
        B: "B．尝试新的菜式。",
        type: "SN",
    }, {
        select: "31,下列哪个说法最能贴切形容你对自己的看法？",
        A: "A．别人认为我会公正处事，并且尊重他人。",
        B: "B．尝试新的菜式。",
        type: "TF",
    },
    {
        select: "32,下列哪个说法最能贴切形容你对自己的看法？",
        A: "A．在喜欢的餐厅用膳。",
        B: "B．别人相信在他们有需要时，我会在他们身边。",
        type: "JP",
    },
    {
        select: "33,下列哪个说法最能贴切形容你对自己的看法？",
        A: "A．坦率。",
        B: "B．深沉。 ",
        type: "EI",
    }, {
        select: "34,下列哪个说法最能贴切形容你对自己的看法？",
        A: "A．留意事实。",
        B: "B．注重事实。",
        type: "SN",
    },
    {
        select: "35,下列哪个说法最能贴切形容你对自己的看法？",
        A: "A．知识广博。",
        B: "B．善解人意。",
        type: "TF",
    },
    {
        select: "36,下列哪个说法最能贴切形容你对自己的看法？",
        A: "A．容易适应转变。",
        B: "B．处事井井有条。",
        type: "JP",
    }, {
        select: "37,下列哪个说法最能贴切形容你对自己的看法？",
        A: "A．爽朗。",
        B: "B．沉稳。",
        type: "EI",
    }, {
        select: "38,下列哪个说法最能贴切形容你对自己的看法？",
        A: "A．实事求是。",
        B: "B．沉稳。",
        type: "SN",
    }, {
        select: "39,下列哪个说法最能贴切形容你对自己的看法？",
        A: "A．喜欢询问实情。",
        B: "B．喜欢探索感受。",
        type: "TF",
    }, {
        select: "40,下列哪个说法最能贴切形容你对自己的看法？",
        A: "A．不断接受新意见。",
        B: "B．着眼达成目标。",
        type: "JP",

    }, {
        select: "41,下列哪个说法最能贴切形容你对自己的看法？",
        A: "A．率直。",
        B: "B．内敛。",
        type: "EI",
    }, {
        select: "42,下列哪个说法最能贴切形容你对自己的看法？",
        A: "A．实事求是。",
        B: "B．具远大目光。",
        type: "SN",

    }, {
        select: "43,下列哪个说法最能贴切形容你对自己的看法？",
        A: "A．公正。",
        B: "B．宽容。",
        type: "TF",
    }, {
        select: "44,你会倾向？",
        A: "A．暂时放下不愉快的事情，直至有心情时才处理。",
        B: "B．及时处理不愉快的事情，务求把它们抛诸脑后。",
        type: "JP",
    }, {
        select: "45,你会倾向？",
        A: "A．自己的工作被欣赏，即使你自己并不满意。",
        B: "B．创造一些有长远价值的东西，但不一定需在别人知道是你做的。",
        type: "EI",
    }, {
        select: "46,你会倾向？",
        A: "A．在自己有兴趣的范畴，积累丰富的经验。",
        B: "B．有各式各样不同的经验。",
        type: "SN",
    }, {
        select: "47,哪一句较能表达你的看法？？",
        A: "A．感情用事的人较容易犯错。",
        B: "B．逻辑思维会令人自以为是，因而容易犯错。",
        type: "TF",
    }, {
        select: "48,哪一句较能表达你的看法？？",
        A: "A．犹豫不决必失败。",
        B: "B．三思而后行。",
        type: "JP",
    }];

//性格数组。
var individuality = [
    {
        character: "性格类型：ISTJ",
        text1: "1.严肃、安静、藉由集中心 志与全力投入、及可被信赖获致成功。",
        text2: "2.行事务实、有序、实际 、 逻辑、真实及可信赖,",
        text3: "3.十分留意且乐于任何事（工作、居家、生活均有良好组织及有序。",
        text4: "4.负责任。",
        text5: "5.照设定成效来作出决策且不畏阻挠与闲言会坚定为之。",
        text6: "6.重视传统与忠诚。",
        text7: "7.传统性的思考者或经理。",
        number: 1,
    }, {
        character: "性格类型：ISFJ",
        text1: "1.安静、和善、负责任且有良心。",
        text2: "2.行事尽责投入。",
        text3: "3.安定性高，常居项目工作或团体之安定力量。",
        text4: "4.愿投入、吃苦及力求精确。",
        text5: "5.兴趣通常不在于科技方面。对细节事务有耐心。",
        text6: "6.忠诚、考虑周到、知性且会关切他人感受。",
        text7: "7.致力于创构有序及和谐的工作与家庭环境。",
        number: 2,
    }, {
        character: "性格类型：INFJ",
        text1: "1.因为坚忍、创意及必须达成的意图而能成功。",
        text2: "2.会在工作中投注最大的努力",
        text3: "3.默默强力的、诚挚的及用心的关切他人。",
        text4: "4.因坚守原则而受敬重。",
        text5: "5.提出造福大众利益的明确远景而为人所尊敬与追随。",
        text6: "6.追求创见、关系及物质财物的意义及关联。",
        text7: "7.想了解什么能激励别人及对他人具洞察力。",
        text8: "8.光明正大且坚信其价值观。",
        text9: "9.有组织且果断地履行其愿景。",
        number: 3,
    }, {
        character: "性格类型：INTJ",
        text1: "1.具强大动力与本意来达成目的与创意—固执顽固者。",
        text2: "2.有宏大的愿景且能快速在众多外界事件中找出有意义的模范。",
        text3: "3.对所承负职务，具良好能力于策划工作并完成。",
        text4: "4.具怀疑心、挑剔性、独立性、果决，对专业水准及绩效要求高。",
        number: 4,
    }, {
        character: "性格类型：ISTP",
        text1: "1.冷静旁观者—安静、预留余地、弹性及会以无偏见的好奇心与未预期原始的幽默观察与分析。",
        text2: "2.有兴趣于探索原因及效果，技术事件是为何及如何运作且使用逻辑的原理组构事实、重视效能。",
        text3: "3.擅长于掌握问题核心及找出解决方式。",
        text4: "4.分析成事的缘由且能实时由大量资料中找出实际问题的核心。",
        number: 5,
    }, {
        character: "性格类型：ISFP",
        text1: "1.羞怯的、安宁和善地、敏感的、亲切的、且行事谦虚。",
        text2: "2.喜于避开争论，不对他人强加已见或价值观。",
        text3: "3.无意于领导却常是忠诚的追随者。",
        text4: "4.办事不急躁，安于现状无意于以过度的急切或努力破坏现况，且非成果导向。",
        text5: "5.喜欢有自有的空间及照自订的时程办事。",
        number: 6,
    }, {
        character: "性格类型：INFP",
        text1: "1.安静观察者，具理想性与对其价值观及重要之人具忠诚心。",
        text2: "2.希外在生活形态与内在价值观相吻合。",
        text3: "3.具好奇心且很快能看出机会所在。常担负开发创意的触媒者。",
        text4: "4.除非价值观受侵犯，行事会具弹性、适应力高且承受力强。",
        text5: "5.具想了解及发展他人潜能的企图。想作太多且作事全神贯注。",
        text6: "6.对所处境遇及拥有不太在意。",
        text7: "7.具适应力、有弹性除非价值观受到威胁。",
        number: 7,
    }, {
        character: "性格类型：INTP",
        text1: "1.安静、自持、弹性及具适应力。",
        text2: "2.特别喜爱追求理论与科学事理。",
        text3: "3.习于以逻辑及分析来解决问题—问题解决者。",
        text4: "4.最有兴趣于创意事务及特定工作，对聚会与闲聊无 大兴趣。",
        text5: "5.追求可发挥个人强烈兴趣的生涯。",
        text6: "6.追求发展对有兴趣事务之逻辑解释。",
        number: 8,
    }, {
        character: "性格类型：ESTP",
        text1: "1.擅长现场实时解决问题—解决问题者。",
        text2: "2.喜欢办事并乐于其中及过程。",
        text3: "3.倾向于喜好技术事务及运动，交结同好友人。",
        text4: "4.具适应性、容忍度、务实性；投注心力于会很快具 成效工作。",
        text5: "5.不喜欢冗长概念的解释及理论。",
        text6: "6.最专精于可操作、处理、分解或组合的真实事务。",
        number: 9,
    }, {
        character: "性格类型：ESFP",
        text1: "1.外向、和善、接受性、乐于分享喜乐予他人。",
        text2: "2.喜欢与他人一起行动且促成事件发生，在学习时亦然。",
        text3: "3.知晓事件未来的发展并会热列参与。",
        text4: "4.最擅长于人际相处能力及具备完备常识，很有弹性能立即 适应他人与环境。",
        text5: "5.对生命、人、物质享受的热爱者。",
        number: 10,
    },  {
        character: "性格类型：ENFP",
        text1: "1.充满热忱、活力充沛、聪明的、富想象力的，视生命充满机会但期能得自他人肯定与支持。",
        text2: "2.几乎能达成所有有兴趣的事。",
        text3: "3.对难题很快就有对策并能对有困难的人施予援手。",
        text4: "4.依赖能改善的能力而无须预作规划准备。",
        text5: "5.为达目的常能找出强制自己为之的理由。",
        text6: "6.即兴执行者。",
        number: 11,
    }
    , {
        character: "性格类型：ENTP",
        text1: "1.反应快、聪明、长于多样事务。",
        text2: "2.具激励伙伴、敏捷及直言讳专长。",
        text3: "3.会为了有趣对问题的两面加予争辩。",
        text4: "4.对解决新及挑战性的问题富有策略，但会轻忽或厌烦经常的任务与细节。",
        text5: "5.兴趣多元，易倾向于转移至新生的兴趣。",
        text6: "6.对所想要的会有技巧地找出逻辑的理由。",
        text7: "7.长于看清础他人，有智能去解决新或有挑战的问题。",
        number: 12,
    }, {
        character: "性格类型：ESTJ",
        text1: "1.务实、真实、事实倾向，具企业或技术天份。",
        text2: "2.不喜欢抽象理论；最喜欢学习可立即运用事理。",
        text3: "3.喜好组织与管理活动且专注以最有效率方式行事以达致成效。",
        text4: "4.具决断力、关注细节且很快作出决策—优秀行政者。",
        text5: "5.会忽略他人感受。",
        text6: "6.喜作领导者或企业主管。",
        text7: "7.做事风格比较偏向于权威指挥性。",
        number: 13,
    }, {
        character: "性格类型：ESFJ",
        text1: "1.诚挚、爱说话、合作性高、受 欢迎、光明正大 的—天生的 合作者及活跃的组织成员。",
        text2: "2.重和谐且长于创造和谐。",
        text3: "3.常作对他人有益事务。",
        text4: "4.给予鼓励及称许会有更佳工作成效。",
        text5: "5.最有兴趣于会直接及有形影响人们生活的事务。",
        text6: "6.喜欢与他人共事去精确且准时地完成工作。",
        number: 14,
    }, {
        character: "性格类型：ENFJ",
        text1: "1.热忱、易感应及负责任的--具能鼓励他人的领导风格。",
        text2: "2.对别人所想或希求会表达真正关切且切实用心去处理。",
        text3: "3.能怡然且技巧性地带领团体讨论或演示文稿提案。",
        text4: "4.爱交际、受欢迎及富同情心。",
        text5: "5.对称许及批评很在意。",
        text6: "n6.喜欢带引别人且能使别人或团体发挥潜能。",
        number: 15,
    }, {
        character: "性格类型：ENTJ",
        text1: "1.坦诚、具决策力的活动领导者。",
        text2: "\n2.长于发展与实施广泛的系统以解决组织的问题。",
        text3: "3.专精于具内涵与智能的谈话如对公众演讲。",
        text4: "4.乐于经常吸收新知且能广开信息管道。",
        text5: "5.易生过度自信，会强于表达自已创见。",
        text6: "6.喜于长程策划及目标设定",
        number: 16,
    },
];

//clickNumber,做下标，做选项下标。
//subject，用来判断，我们对象里面的选择属性。
var clickNumber = 0;
var select = 0;
// console.log(data, data[47].B);
// console.log(individuality);
//默认让选择题，隐藏掉。
$(".topic").hide();
$(document).ready(function () {
    //点击开始隐藏。
    $(".btn-outline-success").click(function () {
        $(".btn-outline-success").addClass("hide");
        $(".warm-prompt").text("冷知识");
        $(".warm-prompt-one").text("1、你可以只用手知道一个角度的度数。");
        $(".warm-prompt-two").text("2、坐在你左边最靠近你的人是你右边最远的人。");
        $(".topic").show();
    });
    judge();
    //选项A
    $("#option-A").click(function () {
        clickNumber = clickNumber + 1;
        select = select + 1;
        if (data[select - 1].type == "EI") {
            $(this).text(data[clickNumber].A);
            $("#option-B").text(data[clickNumber].B);
            $(".subject").text(data[clickNumber].select);
            E = E + 1;
        } else if (data[select - 1].type == "SN") {
            $(this).text(data[clickNumber].A);
            $("#option-B").text(data[clickNumber].B);
            $(".subject").text(data[clickNumber].select);
            S = S + 1;
        } else if (data[select - 1].type == "TF") {
            $(this).text(data[clickNumber].A);
            $("#option-B").text(data[clickNumber].B);
            $(".subject").text(data[clickNumber].select);
            T = T + 1;
        } else if (data[select - 1].type == "JP" && clickNumber <= 47) {//如果clickNumber是47的话，就代表只剩最后一道题。else。
            $(this).text(data[clickNumber].A);
            $("#option-B").text(data[clickNumber].B);
            $(".subject").text(data[clickNumber].select);
            J = J + 1;
        } else {
            J = J + 1;
        }
        //判断函数。
        judge();
    });
    //选项B
    $("#option-B").click(function () {
        clickNumber = clickNumber + 1;
        select = select + 1;
        if (data[select - 1].type == "EI") {
            $(this).text(data[clickNumber].B);
            $("#option-A").text(data[clickNumber].A);
            $(".subject").text(data[clickNumber].select);
            I = I + 1;
        } else if (data[select - 1].type == "SN") {
            $(this).text(data[clickNumber].B);
            $("#option-A").text(data[clickNumber].A);
            $(".subject").text(data[clickNumber].select);
            N = N + 1;
        } else if (data[select - 1].type == "TF") {
            $(this).text(data[clickNumber].B);
            $("#option-A").text(data[clickNumber].A);
            $(".subject").text(data[clickNumber].select);
            F = F + 1;
        } else if (data[select - 1].type == "JP" && clickNumber <= 47) {
            $(this).text(data[clickNumber].B);
            $("#option-A").text(data[clickNumber].A);
            $(".subject").text(data[clickNumber].select);
            P = P + 1;
        } else {
            P = P + 1;
        }
        //判断函数。
        judge();

    });
});

//判断函数
function judge() {
    //点击48次的话，才会去进行判断。
    if (clickNumber === 48) {
        //创建判断的数组
        judgeArray = [];
        if (E <= I) {
            judgeArray.push({attribute: "I"});
        } else if (E > I) {
            judgeArray.push({attribute: "E"});
        }
        if (S <= N) {
            judgeArray.push({attribute: "N"});
        } else if (S > N) {
            judgeArray.push({attribute: "S"});
        }
        if (T <= F) {
            judgeArray.push({attribute: "F"})
        } else if (T > F) {
            judgeArray.push({attribute: "T"});
        }
        if (J <= P) {
            judgeArray.push({attribute: "P"})
        } else if (J > P) {
            judgeArray.push({attribute: "J"});
        }
        // if ()
        sessionStorage.setItem("type", JSON.stringify(judgeArray));
        sessionStorage.setItem("individuality", JSON.stringify(individuality));
        window.location.href = "../html/result.html";
    }
}