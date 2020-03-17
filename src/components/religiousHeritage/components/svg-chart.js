import * as d3 from 'd3'

const NODE_WITDH = 10
const NODE_HEIGHT = 10

class SvgTree {
  constructor(treeData) {
    this.treeData =  this.returnData();
    console.log("tree data="+this.treeData);
    //treeData
    this.d3 = d3
    this.nodeWidth = 800
    this.nodeHeight = 500
  }

  drawTree() {
    const treeBuilder = this.d3.tree().size([this.nodeWidth, this.nodeHeight])
    this.treeData = treeBuilder(this.d3.hierarchy(this.treeData))
    this.update(this.treeData.descendants(), this.treeData.links())
  }

  update(nodeDataList, linkDataList) {
    this.svg = this.d3.select('.svg')

    const self = this
    const links = this.svg.selectAll('link').data(linkDataList)
    links
      .enter()
      .append('path')
      .attr('class', 'link')
      .attr('d', function(d, i) {
        let linkPath = self.d3
          .linkVertical()
          .x(function(d) {
            return d.x + NODE_WITDH / 2
          })
          .y(function(d) {
            return d.y
          })
          .source(function(d) {
            return { x: d.source.x, y: d.source.y }
          })
          .target(function() {
            return { x: d.target.x, y: d.target.y }
          })
        return linkPath(d)
      })
    links.attr('class', 'link')
    links.exit().remove()

    const nodes = this.svg.selectAll('node').data(nodeDataList)
    nodes
      .enter()
      .append('rect')
      .attr('class', 'node')
      .attr('x', d => d.x)
      .attr('y', d => d.y)
      .attr('width', NODE_WITDH)
      .attr('height', NODE_HEIGHT)

    nodes
      .attr('class', 'node')
      .attr('x', d => d.x)
      .attr('y', d => d.y)
      .attr('width', NODE_WITDH)
      .attr('height', NODE_HEIGHT)

    nodes.exit().remove()
  }

  bigger() {
    // TODO
  }

  smaller() {
    // TODO
  }
  returnData(){
    var data = {   
      "children": [
        {
          "children": [
            {
              "children": [
                {
                  "children": [
                    {
                      "children": [],
                      "id": "root",
                      "property": {
                        "areaName": "玉斯屯库木艾日克村",
                        "count": 42,
                        "label": "village",
                        "childCount": 0,
                        "persons": []
                      }
                    },
                    {
                      "children": [],
                      "id": "root",
                      "property": {
                        "areaName": "玉尔其村",
                        "count": 46,
                        "label": "village",
                        "childCount": 0,
                        "persons": []
                      }
                    },
                    {
                      "children": [],
                      "id": "root",
                      "property": {
                        "areaName": "托马艾日克村",
                        "count": 25,
                        "label": "village",
                        "childCount": 0,
                        "persons": []
                      }
                    },
                    {
                      "children": [],
                      "id": "root",
                      "property": {
                        "areaName": "托万库木艾日克村",
                        "count": 21,
                        "label": "village",
                        "childCount": 0,
                        "persons": []
                      }
                    },
                    {
                      "children": [],
                      "id": "root",
                      "property": {
                        "areaName": "尤库日斯村",
                        "count": 35,
                        "label": "village",
                        "childCount": 0,
                        "persons": []
                      }
                    },
                    {
                      "children": [],
                      "id": "root",
                      "property": {
                        "areaName": "铁热克阿瓦提村",
                        "count": 2,
                        "label": "village",
                        "childCount": 0,
                        "persons": []
                      }
                    },
                    {
                      "children": [],
                      "id": "root",
                      "property": {
                        "areaName": "阿热阿依玛克村",
                        "count": 19,
                        "label": "village",
                        "childCount": 0,
                        "persons": []
                      }
                    }
                  ],
                  "id": "root",
                  "property": {
                    "areaName": "玉尔其乡",
                    "count": 190,
                    "label": "town",
                    "childCount": 5,
                    "persons": []
                  }
                },
                {
                  "children": [
                    {
                      "children": [],
                      "id": "root",
                      "property": {
                        "areaName": "博斯坦村",
                        "count": 4,
                        "label": "village",
                        "childCount": 0,
                        "persons": []
                      }
                    },
                    {
                      "children": [],
                      "id": "root",
                      "property": {
                        "areaName": "巴合恰村",
                        "count": 6,
                        "label": "village",
                        "childCount": 0,
                        "persons": []
                      }
                    },
                    {
                      "children": [],
                      "id": "root",
                      "property": {
                        "areaName": "其曼村",
                        "count": 2,
                        "label": "village",
                        "childCount": 0,
                        "persons": []
                      }
                    },
                    {
                      "children": [],
                      "id": "root",
                      "property": {
                        "areaName": "托玛巴什村",
                        "count": 5,
                        "label": "village",
                        "childCount": 0,
                        "persons": []
                      }
                    },
                    {
                      "children": [],
                      "id": "root",
                      "property": {
                        "areaName": "科克托乎拉克村",
                        "count": 1,
                        "label": "village",
                        "childCount": 0,
                        "persons": []
                      }
                    },
                    {
                      "children": [],
                      "id": "root",
                      "property": {
                        "areaName": "努尔巴格村",
                        "count": 1,
                        "label": "village",
                        "childCount": 0,
                        "persons": []
                      }
                    },
                    {
                      "children": [],
                      "id": "root",
                      "property": {
                        "areaName": "萨依巴格村",
                        "count": 4,
                        "label": "village",
                        "childCount": 0,
                        "persons": []
                      }
                    }
                  ],
                  "id": "root",
                  "property": {
                    "areaName": "启浪乡",
                    "count": 23,
                    "label": "town",
                    "childCount": 1,
                    "persons": []
                  }
                },
                {
                  "children": [
                    {
                      "children": [],
                      "id": "root",
                      "property": {
                        "areaName": "教育路",
                        "count": 1,
                        "label": "village",
                        "childCount": 0,
                        "persons": []
                      }
                    }
                  ],
                  "id": "root",
                  "property": {
                    "areaName": "阿克苏市",
                    "count": 1,
                    "label": "town",
                    "childCount": 0,
                    "persons": []
                  }
                },
                {
                  "children": [
                    {
                      "children": [],
                      "id": "root",
                      "property": {
                        "areaName": "英巴格路",
                        "count": 1,
                        "label": "village",
                        "childCount": 0,
                        "persons": []
                      }
                    },
                    {
                      "children": [],
                      "id": "root",
                      "property": {
                        "areaName": "托万巴格勒克",
                        "count": 2,
                        "label": "village",
                        "childCount": 0,
                        "persons": []
                      }
                    },
                    {
                      "children": [],
                      "id": "root",
                      "property": {
                        "areaName": "库木鲁克村",
                        "count": 7,
                        "label": "village",
                        "childCount": 0,
                        "persons": []
                      }
                    },
                    {
                      "children": [],
                      "id": "root",
                      "property": {
                        "areaName": "托万喀什艾日克村",
                        "count": 6,
                        "label": "village",
                        "childCount": 0,
                        "persons": []
                      }
                    },
                    {
                      "children": [],
                      "id": "root",
                      "property": {
                        "areaName": "盖孜力克村",
                        "count": 4,
                        "label": "village",
                        "childCount": 0,
                        "persons": []
                      }
                    },
                    {
                      "children": [],
                      "id": "root",
                      "property": {
                        "areaName": "托万巴格勒克村",
                        "count": 8,
                        "label": "village",
                        "childCount": 0,
                        "persons": []
                      }
                    },
                    {
                      "children": [],
                      "id": "root",
                      "property": {
                        "areaName": "帕松村",
                        "count": 7,
                        "label": "village",
                        "childCount": 0,
                        "persons": []
                      }
                    }
                  ],
                  "id": "root",
                  "property": {
                    "areaName": "盖孜力乡",
                    "count": 35,
                    "label": "town",
                    "childCount": 0,
                    "persons": []
                  }
                },
                {
                  "children": [
                    {
                      "children": [],
                      "id": "root",
                      "property": {
                        "areaName": "喀拉库提村",
                        "count": 22,
                        "label": "village",
                        "childCount": 0,
                        "persons": []
                      }
                    },
                    {
                      "children": [],
                      "id": "root",
                      "property": {
                        "areaName": "绿洲路7号",
                        "count": 1,
                        "label": "village",
                        "childCount": 0,
                        "persons": []
                      }
                    }
                  ],
                  "id": "root",
                  "property": {
                    "areaName": "柯坪镇",
                    "count": 23,
                    "label": "town",
                    "childCount": 0,
                    "persons": []
                  }
                },
                {
                  "children": [
                    {
                      "children": [],
                      "id": "root",
                      "property": {
                        "areaName": "团结村",
                        "count": 5,
                        "label": "village",
                        "childCount": 0,
                        "persons": []
                      }
                    },
                    {
                      "children": [],
                      "id": "root",
                      "property": {
                        "areaName": "盖孜力村",
                        "count": 2,
                        "label": "village",
                        "childCount": 0,
                        "persons": []
                      }
                    },
                    {
                      "children": [],
                      "id": "root",
                      "property": {
                        "areaName": "其兰村",
                        "count": 6,
                        "label": "village",
                        "childCount": 0,
                        "persons": []
                      }
                    },
                    {
                      "children": [],
                      "id": "root",
                      "property": {
                        "areaName": "库木鲁克村",
                        "count": 4,
                        "label": "village",
                        "childCount": 0,
                        "persons": []
                      }
                    },
                    {
                      "children": [],
                      "id": "root",
                      "property": {
                        "areaName": "乌喀路",
                        "count": 3,
                        "label": "village",
                        "childCount": 0,
                        "persons": []
                      }
                    },
                    {
                      "children": [],
                      "id": "root",
                      "property": {
                        "areaName": "吐拉村",
                        "count": 2,
                        "label": "village",
                        "childCount": 0,
                        "persons": []
                      }
                    },
                    {
                      "children": [],
                      "id": "root",
                      "property": {
                        "areaName": "喀拉玛村",
                        "count": 10,
                        "label": "village",
                        "childCount": 0,
                        "persons": []
                      }
                    }
                  ],
                  "id": "root",
                  "property": {
                    "areaName": "阿恰勒镇",
                    "count": 32,
                    "label": "town",
                    "childCount": 0,
                    "persons": []
                  }
                }
              ],
              "id": "root",
              "property": {
                "areaName": "柯坪县",
                "count": 304,
                "label": "county",
                "childCount": 111,
                "persons": []
              }
            },
            {
              "children": [
                {
                  "children": [
                    {
                      "children": [],
                      "id": "root",
                      "property": {
                        "areaName": "赛克孜奥塔克村",
                        "count": 63,
                        "label": "village",
                        "childCount": 0,
                        "persons": []
                      }
                    }
                  ],
                  "id": "root",
                  "property": {
                    "areaName": "多浪乡",
                    "count": 63,
                    "label": "town",
                    "childCount": 3,
                    "persons": []
                  }
                },
                {
                  "children": [
                    {
                      "children": [],
                      "id": "root",
                      "property": {
                        "areaName": "托万克赛克孜奥塔克村",
                        "count": 1,
                        "label": "village",
                        "childCount": 0,
                        "persons": []
                      }
                    }
                  ],
                  "id": "root",
                  "property": {
                    "areaName": "塔木托格拉克镇",
                    "count": 1,
                    "label": "town",
                    "childCount": 0,
                    "persons": []
                  }
                }
              ],
              "id": "root",
              "property": {
                "areaName": "阿瓦提县",
                "count": 64,
                "label": "county",
                "childCount": 55,
                "persons": []
              }
            },
            {
              "children": [
                {
                  "children": [
                    {
                      "children": [],
                      "id": "root",
                      "property": {
                        "areaName": "玉素甫霍加艾日克村",
                        "count": 1,
                        "label": "village",
                        "childCount": 0,
                        "persons": []
                      }
                    }
                  ],
                  "id": "root",
                  "property": {
                    "areaName": "拜什吐格曼乡",
                    "count": 1,
                    "label": "town",
                    "childCount": 0,
                    "persons": []
                  }
                },
                {
                  "children": [
                    {
                      "children": [],
                      "id": "root",
                      "property": {
                        "areaName": "祥和路18号",
                        "count": 1,
                        "label": "village",
                        "childCount": 0,
                        "persons": []
                      }
                    }
                  ],
                  "id": "root",
                  "property": {
                    "areaName": "南城街道",
                    "count": 1,
                    "label": "town",
                    "childCount": 0,
                    "persons": []
                  }
                },
                {
                  "children": [
                    {
                      "children": [],
                      "id": "root",
                      "property": {
                        "areaName": "47号5号楼",
                        "count": 1,
                        "label": "village",
                        "childCount": 0,
                        "persons": []
                      }
                    }
                  ],
                  "id": "root",
                  "property": {
                    "areaName": "南大街",
                    "count": 1,
                    "label": "town",
                    "childCount": 0,
                    "persons": []
                  }
                }
              ],
              "id": "root",
              "property": {
                "areaName": "阿克苏市",
                "count": 3,
                "label": "county",
                "childCount": 0,
                "persons": []
              }
            }
          ],
          "id": "root",
          "property": {
            "areaName": "阿克苏地区",
            "count": 371,
            "label": "city",
            "childCount": 196,
            "persons": []
          }
        },
        {
          "children": [
            {
              "children": [
                {
                  "children": [
                    {
                      "children": [],
                      "id": "root",
                      "property": {
                        "areaName": "方家庄村",
                        "count": 1,
                        "label": "village",
                        "childCount": 0,
                        "persons": []
                      }
                    }
                  ],
                  "id": "root",
                  "property": {
                    "areaName": "水西沟镇",
                    "count": 1,
                    "label": "town",
                    "childCount": 0,
                    "persons": []
                  }
                }
              ],
              "id": "root",
              "property": {
                "areaName": "乌鲁木齐县",
                "count": 1,
                "label": "county",
                "childCount": 0,
                "persons": []
              }
            }
          ],
          "id": "root",
          "property": {
            "areaName": "乌鲁木齐市",
            "count": 1,
            "label": "city",
            "childCount": 1,
            "persons": []
          }
        }
      ],
      "id": "root",
      "property": {
        "areaName": "马木提·艾山体系",
        "count": 51,
        "label": "",
        "childCount": 0,
        "persons": [
          {
            "personId": "2841886",
            "name": "马木提·艾山",
            "idNumber": "Y65292900000000002"
          },
          {
            "personId": "280804",
            "name": "吾甫尔·马木提",
            "idNumber": "652929193405200296"
          },
          {
            "personId": "324078",
            "name": "阿布力米提·牙合牙",
            "idNumber": "652929193212050519"
          },
          {
            "personId": "540373",
            "name": "扎依提·提力瓦力地",
            "idNumber": "652929197210150792"
          },
          {
            "personId": "648749",
            "name": "牙生·托乎提",
            "idNumber": "652929194411070330"
          },
          {
            "personId": "779333",
            "name": "托合逊·木拉",
            "idNumber": "652929192210140516"
          },
          {
            "personId": "886538",
            "name": "吐尔逊江·许库尔",
            "idNumber": "652929197510080773"
          },
          {
            "personId": "973001",
            "name": "艾沙·达比提",
            "idNumber": "652929196909200277"
          },
          {
            "personId": "1081348",
            "name": "巴哈依丁·阿塔吾拉",
            "idNumber": "652929195704020518"
          },
          {
            "personId": "1142385",
            "name": "斯热吉丁·阿塔伍拉",
            "idNumber": "652927195705101034"
          },
          {
            "personId": "1168253",
            "name": "卡地尔·吐木尔",
            "idNumber": "652929193803200275"
          },
          {
            "personId": "1211010",
            "name": "依沙木东·巴吾东",
            "idNumber": "652929196304040290"
          },
          {
            "personId": "1468938",
            "name": "艾买尔江·买买提",
            "idNumber": "652929196602100271"
          },
          {
            "personId": "1750696",
            "name": "买买提·毛拉艾买提",
            "idNumber": "65292919470701029X"
          },
          {
            "personId": "1772681",
            "name": "阿不都热合曼·卡地尔",
            "idNumber": "652929197201250775"
          },
          {
            "personId": "1838113",
            "name": "努尔·肉孜",
            "idNumber": "65292919340415067X"
          },
          {
            "personId": "1925041",
            "name": "阿布都嘎依提·沙依提",
            "idNumber": "652929193903070551"
          },
          {
            "personId": "1989499",
            "name": "胡都尤木·吐尔地",
            "idNumber": "652929193506080270"
          },
          {
            "personId": "2011241",
            "name": "阿不都拉·木哈买提",
            "idNumber": "652929196005160516"
          },
          {
            "personId": "2075867",
            "name": "卡热·库尔班",
            "idNumber": "652929194407310274"
          },
          {
            "personId": "2184800",
            "name": "买买提·沙吾提",
            "idNumber": "652929193409170290"
          },
          {
            "personId": "2228033",
            "name": "阿不力孜·艾则木",
            "idNumber": "652929194003010275"
          },
          {
            "personId": "2314584",
            "name": "吾甫尔·吾斯曼",
            "idNumber": "652929192710100270"
          },
          {
            "personId": "2358007",
            "name": "斯马依·沙地克",
            "idNumber": "652929193108120273"
          },
          {
            "personId": "2400561",
            "name": "哈力克·吾甫尔",
            "idNumber": "652929197003010279"
          },
          {
            "personId": "2400874",
            "name": "艾海提·托乎提",
            "idNumber": "652929196708010290"
          },
          {
            "personId": "2509076",
            "name": "阿布都赛买提·沙力",
            "idNumber": "652929193305120512"
          },
          {
            "personId": "2595434",
            "name": "吐尔地·那扎尔",
            "idNumber": "652929192510010772"
          },
          {
            "personId": "2681746",
            "name": "热依木·艾买提",
            "idNumber": "652929195411060292"
          },
          {
            "personId": "2841818",
            "name": "阿不都赛买提•热依木",
            "idNumber": "Y65292900000000020"
          },
          {
            "personId": "2841819",
            "name": "库完·阿訇",
            "idNumber": "Y65292900000000024"
          },
          {
            "personId": "2841820",
            "name": "艾扎克·热曼",
            "idNumber": "Y65292900000000023"
          },
          {
            "personId": "2841821",
            "name": "卡迪尔•沙比尔",
            "idNumber": "Y65292900000000022"
          },
          {
            "personId": "2841823",
            "name": "马木提·艾来木",
            "idNumber": "Y65292900000000028"
          },
          {
            "personId": "2841824",
            "name": "艾则木·艾则孜",
            "idNumber": "Y65292900000000027"
          },
          {
            "personId": "2841825",
            "name": "阿西木·艾萨",
            "idNumber": "Y65292900000000026"
          },
          {
            "personId": "2841827",
            "name": "米慢·台外库里",
            "idNumber": "Y65292900000000029"
          },
          {
            "personId": "2841828",
            "name": "玉山•依斯马依",
            "idNumber": "Y65292900000000013"
          },
          {
            "personId": "2841829",
            "name": "买买提扎依提•艾拉克",
            "idNumber": "Y65292900000000012"
          },
          {
            "personId": "2841831",
            "name": "吐尔逊卡孜·阿吉",
            "idNumber": "Y65292900000000010"
          },
          {
            "personId": "2841833",
            "name": "阿木东•沙迪克",
            "idNumber": "Y65292900000000016"
          },
          {
            "personId": "2841834",
            "name": "阿不都瓦依提•阿木东",
            "idNumber": "Y65292900000000015"
          },
          {
            "personId": "2841836",
            "name": "苏瓦克•苏皮",
            "idNumber": "Y65292900000000019"
          },
          {
            "personId": "2841837",
            "name": "买合苏木·沙依提",
            "idNumber": "Y65292900000000018"
          },
          {
            "personId": "2841838",
            "name": "西热甫•巴热提",
            "idNumber": "Y65292900000000009"
          },
          {
            "personId": "2841839",
            "name": "比拉力•阿吉",
            "idNumber": "Y65292900000000008"
          },
          {
            "personId": "2841841",
            "name": "毛拉克·巴热提",
            "idNumber": "Y65292900000000030"
          },
          {
            "personId": "2841842",
            "name": "伊曼库里·托乎提",
            "idNumber": "Y65292900000000034"
          },
          {
            "personId": "2841843",
            "name": "努尔买买提·阿訇",
            "idNumber": "Y65292900000000033"
          },
          {
            "personId": "2841844",
            "name": "阿尤甫·阿木提",
            "idNumber": "Y65292900000000032"
          },
          {
            "personId": "108011",
            "name": "达吾提·吾许尔",
            "idNumber": "652929192909100278"
          }
        ]
      }
    };
    return data;
  }
}

export default SvgTree
